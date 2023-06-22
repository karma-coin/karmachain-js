/**
 * Test assumptions
 *  - Node setup and available at address `ws://127.0.0.1:9944`,
 *  - Node runs in verifier mode
 *  - Node runs with an enabled offchain worker
 *  - Alice's account is a phone verifier
 *  - Bypass token equals `dummy`
 *  - Alice has sufficient balance to cover balance transfer of 3 KC + transactions fees
 */

import anyTest from "ava";
import {
  call_new_user,
  defaultSetup,
  delay,
  KCoin,
  NO_CHAR_TRAIT_ID,
  NO_COMMUNITY_ID,
  subscribeAccountEvents,
} from "./utils.js";

const test = anyTest;

test.beforeEach(async (t) => await defaultSetup(t));

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

  await Promise.all([firstUserRegistration, secondUserRegistration]);

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

  // Preform a basic transfer
  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      null
    )
    .signAndSend(t.context.users[0].pair);

  // Wait 1 block for transaction to process and blocks to finalize.
  // Finalization is 2 blocks behind best block, so wait for 2 additioanl blocks
  // Waiting for one block to be suee that block finalized
  await delay(48000);

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

  await Promise.all([firstUserRegistration, secondUserRegistration]);

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

  // Preform basic transfer without suffient founds
  t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      5000 * KCoin,
      NO_COMMUNITY_ID,
      NO_CHAR_TRAIT_ID
    )
    .signAndSend(t.context.users[0].pair)
    .catch(() => {
      // We expect `account balance too low` error, so skip it
    });

  // Wait for blocks finalization
  await delay(48000);

  unsubscribe();
});
