import anyTest from "ava";
import { call_new_user, subscribeEvents, defaultSetup, delay, KCoin, MINDFUL } from "./utils.js";

const test = anyTest;

test.beforeEach(async (t) => await defaultSetup(t));

test("Get account info", async (t) => {
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  const infoByAccountId =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.users[0].pair.address
    );

  const infoByPhoneNumber =
    await t.context.api.rpc.identity.getUserInfoByNumber.raw(
      t.context.users[0].phoneNumber
    );

  t.assert(infoByAccountId.account_id === t.context.users[0].pair.address);
  t.assert(infoByAccountId.nonce === 1);
  t.assert(infoByAccountId.user_name === t.context.users[0].username);
  t.assert(infoByAccountId.mobile_number === t.context.users[0].phoneNumber);
  t.assert(infoByAccountId.balance === 10 * KCoin);
  t.assert(infoByAccountId.trait_scores.length === 1);
  t.assert(infoByAccountId.trait_scores[0].trait_id === 1);
  t.assert(infoByAccountId.trait_scores[0].karma_score === 1);
  t.assert(infoByAccountId.trait_scores[0].community_id === 0);
  t.assert(infoByAccountId.karma_score === 1);
  t.assert(infoByAccountId.community_membership.length === 0);
  t.assert(
    JSON.stringify(infoByAccountId) === JSON.stringify(infoByPhoneNumber)
  );
});

test("Get all txs and events stored on node to and from an account id", async (t) => {
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

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);

  await delay(12000);

  const firstUserTransactions =
    await t.context.api.rpc.transactions.getTransactions.raw(
      t.context.users[0].pair.address
    );

  t.assert(firstUserTransactions.transactions.length === 2);

  t.assert(firstUserTransactions.transactions[0].status === "OnChain");
  t.assert(
    firstUserTransactions.transactions[0].from.account_id ===
      t.context.users[0].pair.address
  );
  t.assert(
    firstUserTransactions.transactions[0].to.account_id ===
      t.context.users[0].pair.address
  );
  t.assert(
    t.context.api.tx.identity.newUser.is(
      t.context.api.tx(
        firstUserTransactions.transactions[0].signed_transaction
          .transaction_body
      )
    )
  );

  t.assert(firstUserTransactions.transactions[1].status === "OnChain");
  t.assert(
    firstUserTransactions.transactions[1].from.account_id ===
      t.context.users[0].pair.address
  );
  t.assert(
    firstUserTransactions.transactions[1].to.account_id ===
      t.context.users[1].pair.address
  );
  t.assert(
    t.context.api.tx.appreciation.appreciation.is(
      t.context.api.tx(
        firstUserTransactions.transactions[1].signed_transaction
          .transaction_body
      )
    )
  );

  const secondUserTransactions =
    await t.context.api.rpc.transactions.getTransactions.raw(
      t.context.users[1].pair.address
    );

  t.assert(secondUserTransactions.transactions.length === 2);

  t.assert(secondUserTransactions.transactions[0].status === "OnChain");
  t.assert(
    secondUserTransactions.transactions[0].from.account_id ===
      t.context.users[1].pair.address
  );
  t.assert(
    secondUserTransactions.transactions[0].to.account_id ===
      t.context.users[1].pair.address
  );
  t.assert(
    t.context.api.tx.identity.newUser.is(
      t.context.api.tx(
        secondUserTransactions.transactions[0].signed_transaction
          .transaction_body
      )
    )
  );

  t.assert(secondUserTransactions.transactions[1].status === "OnChain");
  t.assert(
    secondUserTransactions.transactions[1].from.account_id ===
      t.context.users[0].pair.address
  );
  t.assert(
    secondUserTransactions.transactions[1].to.account_id ===
      t.context.users[1].pair.address
  );
  t.assert(
    t.context.api.tx.appreciation.appreciation.is(
      t.context.api.tx(
        secondUserTransactions.transactions[1].signed_transaction
          .transaction_body
      )
    )
  );
});

test("Get genesis data from chain for a NetID", async (t) => {
  // TODO: ???
  t.assert(true)
});

test("Get current chain state", async (t) => {
  const header = await t.context.api.rpc.chain.getHeader();
  t.assert(header.number.toNumber());
});

test("Get a list of users with pagination with optional alphanumeric prefix filter", async (t) => {
  const firstUserRegistration = call_new_user(
    t.context.api,
    t.context.users[0].pair,
    "Tom" + t.context.users[0].username,
    t.context.users[0].phoneNumber
  );
  const secondUserRegistration = call_new_user(
    t.context.api,
    t.context.users[1].pair,
    "Tomas" + t.context.users[1].username,
    t.context.users[1].phoneNumber
  );
  const thirdUserRegistration = call_new_user(
    t.context.api,
    t.context.users[2].pair,
    "Toby" + t.context.users[2].username,
    t.context.users[2].phoneNumber
  );

  await Promise.all([
    firstUserRegistration,
    secondUserRegistration,
    thirdUserRegistration,
  ]);

  const tomContacts = await t.context.api.rpc.community.getContacts("Tom");
  t.assert(tomContacts.length === 2);

  const toContacts = await t.context.api.rpc.community.getContacts("To");
  t.assert(toContacts.length === 3);

  const tomaContacts = await t.context.api.rpc.community.getContacts("Toma");
  t.assert(tomaContacts.length === 1);
});

test("Subscribe on finalized blocks", async(t) => {
  let newUserCounter = 0;
  let appreciationCounter = 0;

  const unsubscribe = await subscribeEvents(t.context.api, (extrinsic, events) => {
    if (t.context.api.tx.identity.newUser.is(extrinsic)) {
      newUserCounter += 1;
    }

    if (t.context.api.tx.appreciation.appreciation.is(extrinsic)) {
      appreciationCounter += 1;
    }
  });

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

  t.assert(newUserCounter == 2);
  t.assert(appreciationCounter == 1);

  unsubscribe();
})
