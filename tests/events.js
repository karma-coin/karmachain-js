import anyTest from "ava";
import {
  call_new_user,
  delay,
  generateUser,
  init,
  KCoin,
  NO_CHAR_TRAIT_ID,
  NO_COMMUNITY_ID,
  subscribeAccountEvents,
} from "./utils.js";
import { Keyring } from "@polkadot/api";

const test = anyTest;

test.beforeEach(async (t) => {
  // Setup connection to node
  t.context.api = await init();
  // Setup crypto key manager
  t.context.keyring = new Keyring({ type: "sr25519" });

  // Setup some user accounts
  t.context.users = [];
  for (let i = 0; i < 10; i++) {
    t.context.users[i] = generateUser(t.context.keyring);
  }

  // Add Alice private keys
  t.context.alice = t.context.keyring.addFromUri("//Alice");
  // Add Bob private keys
  t.context.bob = t.context.keyring.addFromUri("//Bob");

  // Set tests timeout for 10 minutes
  t.timeout(600000);
});

test("Events stream basic test", async (t) => {
  const firstUserRegistration = call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );
  const secondUserRegistration = call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );
  // For fee cover
  const aliceTransfer = t.context.api.tx.balances
    .transfer(t.context.users[0].pair.address, 1000 * KCoin)
    .signAndSend(t.context.alice);

  await Promise.all([
    firstUserRegistration,
    secondUserRegistration,
    aliceTransfer,
  ]);

  const unsubscribe = await subscribeAccountEvents(
    t.context.api,
    t.context.users[0].pair.address,
    (extrinsic, events) => {
      if (t.context.api.tx.appreciation.appreciation.is(extrinsic)) {
        // Check transfer event
        const transferEvent = events.find((event) =>
          t.context.api.events.balances.Transfer.is(event.event)
        );
        if (transferEvent) {
          t.assert(
            transferEvent.event.data.from.eq(t.context.users[0].pair.address)
          );
          t.assert(
            transferEvent.event.data.to.eq(t.context.users[1].pair.address)
          );
          t.assert(transferEvent.event.data.amount.eq(KCoin));
        }

        // Check appreciation event
        const appreciationEvent = events.find((event) =>
          t.context.api.events.appreciation.Appreciation.is(event.event)
        );
        if (appreciationEvent) {
          t.assert(
            appreciationEvent.event.data.payer.eq(
              t.context.users[0].pair.address
            )
          );
          t.assert(
            appreciationEvent.event.data.payee.eq(
              t.context.users[1].pair.address
            )
          );
          t.assert(appreciationEvent.event.data.amount.eq(KCoin));
          t.assert(
            appreciationEvent.event.data.communityId.eq(NO_COMMUNITY_ID)
          ); // Default value for no community
          t.assert(
            appreciationEvent.event.data.charTraitId.eq(NO_CHAR_TRAIT_ID)
          ); // Default value for no char trait
        }
      }
    }
  );

  // Preform basic transfer
  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      null
    )
    .signAndSend(t.context.users[0].pair);

  // Wait one block while transaction processed and blocks finalization,
  // finalization is 2 blocks behind best block so wait for 2 blocks more
  await delay(180000);

  unsubscribe();
});

test("Insufficient funds tx", async (t) => {
  const firstUserRegistration = call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );
  const secondUserRegistration = call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );
  // For fee cover
  const aliceTransfer = t.context.api.tx.balances
    .transfer(t.context.users[0].pair.address, 1000 * KCoin)
    .signAndSend(t.context.alice);

  await Promise.all([
    firstUserRegistration,
    secondUserRegistration,
    aliceTransfer,
  ]);

  const unsubscribe = await subscribeAccountEvents(
    t.context.api,
    t.context.users[0].pair.address,
    (extrinsic, events) => {
      if (t.context.api.tx.appreciation.appreciation.is(extrinsic)) {
        // Appreciation event should fail
        t.assert(
          events.find((event) =>
            t.context.api.events.system.ExtrinsicFailed.is(event.event)
          )
        );
      }
    }
  );

  // Preform basic transfer without enough founds
  t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      5000 * KCoin,
      null,
      null
    )
    .signAndSend(t.context.users[0].pair)
    .catch(() => {
      // We expect `account balance too low` error, so skip it
    });

  // Wait one block while transaction processed and blocks finalization
  await delay(240000);

  unsubscribe();
});
