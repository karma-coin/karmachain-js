/**
 * This tests assumes:
 *  * node setup and available by address `ws://127.0.0.1:9944`,
 *  * node run in verifier mode
 *  * Alice account is a phone verifier
 *  * Bypass token equal `dummy`
 *  * Alice have balance enough to cover balance transfer 3 KC + transactions fees
 */

import {
  init,
  delay,
  call_new_user,
  MINDFUL,
  KCoin,
  generateUser,
  REFERRAL,
} from "./utils.js";
import anyTest from "ava";
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

  // Set tests timeout for 5 minutes
  t.timeout(300000);
});

test("Signup", async (t) => {
  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[0].pair.address
  );

  t.assert(info.account_id === t.context.users[0].pair.address);
  t.assert(info.user_name === t.context.users[0].username);
  t.assert(info.mobile_number === t.context.users[0].phoneNumber);
});

test("Signup when already signed up on a different device", async (t) => {
  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[0].pair.address
  );

  t.assert(info.account_id === t.context.users[0].pair.address);
  t.assert(info.user_name === t.context.users[0].username);
  t.assert(info.mobile_number === t.context.users[0].phoneNumber);

  // Call `new_user` tx to register user with different keypair
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterUpdate =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.users[1].pair.address
    );
  t.assert(infoAfterUpdate.account_id === t.context.users[1].pair.address);
  t.assert(infoAfterUpdate.user_name === t.context.users[0].username);
  t.assert(infoAfterUpdate.mobile_number === t.context.users[0].phoneNumber);
});

test("Appreciation to a non-user, that person signs up and the appreciation is executed post signup and referral gets the referral reward.", async (t) => {
  const firstUserRegistration = call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );
  // For fee cover
  const aliceTransfer = t.context.api.tx.balances
    .transfer(t.context.users[0].pair.address, 1000 * KCoin)
    .signAndSend(t.context.alice);

  await Promise.all([firstUserRegistration, aliceTransfer]);
  // Wait one block to check that transaction not included into the block
  await delay(60000);

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);
  const paymentInfo = await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .paymentInfo(t.context.users[0].pair);
  // Wait one block to check that transaction not included into the block
  await delay(60000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[1].pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.assert(info === null);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );

  // Get information about sender of appreciation
  const senderInfo = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[0].pair.address
  );
  t.assert(senderInfo.account_id === t.context.users[0].pair.address);
  t.assert(senderInfo.user_name === t.context.users[0].username);
  t.assert(senderInfo.mobile_number === t.context.users[0].phoneNumber);
  // signup reward + transfer from Alice - coins send with appreciation - fee
  t.assert(
    senderInfo.balance ===
      10 * KCoin + 1000 * KCoin - KCoin - paymentInfo.partialFee
  );
  // TODO: should uncommented when referral feature will be implemented
  // t.assert(
  //   senderInfo.trait_scores.find(
  //     (traitScore) => traitScore.trait_id === REFERRAL
  //   ) != null
  // );

  // Get information about receiver of appreciation
  const receiverInfo =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.users[1].pair.address
    );
  t.assert(receiverInfo.account_id === t.context.users[1].pair.address);
  t.assert(receiverInfo.user_name === t.context.users[1].username);
  t.assert(receiverInfo.mobile_number === t.context.users[1].phoneNumber);
  // Coins send with appreciation + signup reward
  t.assert(receiverInfo.balance === KCoin + 10 * KCoin);
  t.assert(
    receiverInfo.trait_scores.find(
      (traitScore) => traitScore.trait_id === MINDFUL
    ) != null
  );
});

test("Appreciation of an existing user.", async (t) => {
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

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);

  // Wait one block while transaction processed
  await delay(60000);

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[1].pair.address
  );
  t.assert(info.account_id === t.context.users[1].pair.address);
  t.assert(info.user_name === t.context.users[1].username);
  t.assert(info.mobile_number === t.context.users[1].phoneNumber);
  // Coins send with appreciation + signup reward
  t.assert(info.balance === KCoin + 10 * KCoin);
  t.assert(
    info.trait_scores.find((traitScore) => traitScore.trait_id === MINDFUL) !=
      null
  );
});

test("Payment transaction (w/o an appreciation) between a user and non-user. The receiver signs up and gets the coin sent to it in the transaction.", async (t) => {
  const firstUserRegistration = call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );
  // For fee cover
  const aliceTransfer = t.context.api.tx.balances
    .transfer(t.context.users[0].pair.address, 1000 * KCoin)
    .signAndSend(t.context.alice);

  await Promise.all([firstUserRegistration, aliceTransfer]);

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      null
    )
    .signAndSend(t.context.users[0].pair);

  // Wait one block while transaction processed
  await delay(60000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[1].pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.assert(info === null);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterRegistration =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.users[1].pair.address
    );
  t.assert(
    infoAfterRegistration.account_id === t.context.users[1].pair.address
  );
  t.assert(infoAfterRegistration.user_name === t.context.users[1].username);
  t.assert(
    infoAfterRegistration.mobile_number === t.context.users[1].phoneNumber
  );
  // Coins send with appreciation + signup reward
  t.assert(infoAfterRegistration.balance === KCoin + 10 * KCoin);
});
