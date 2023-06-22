/**
 * Test assumptions
 *  - Node setup and available at address `ws://127.0.0.1:9944`,
 *  - Node runs in verifier mode
 *  - Node runs with an enabled offchain worker
 *  - Alice's account is a phone verifier
 *  - Bypass token equals `dummy`
 *  - Alice has sufficient balance to cover balance transfer of 3 KC + transactions fees
 */

import {
  delay,
  call_new_user,
  MINDFUL,
  KCoin,
  REFERRAL,
  defaultSetup,
  assertBalance,
  REFERRAL_REWARD,
} from "./utils.js";
import anyTest from "ava";

const test = anyTest;

test.beforeEach(async (t) => await defaultSetup(t));

test("Signup", async (t) => {
  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[0].pair.address
  );

  t.is(info.account_id, t.context.users[0].pair.address);
  t.is(info.user_name, t.context.users[0].username);
  t.is(info.phone_number_hash, t.context.users[0].phoneNumberHash);
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
  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[0].pair.address
  );

  t.is(info.account_id, t.context.users[0].pair.address);
  t.is(info.user_name, t.context.users[0].username);
  t.is(info.phone_number_hash, t.context.users[0].phoneNumberHash);

  // Call `new_user` tx to register user with different keypair
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterUpdate =
    await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
      t.context.users[1].pair.address
    );
  t.is(infoAfterUpdate.account_id, t.context.users[1].pair.address);
  t.is(infoAfterUpdate.user_name, t.context.users[0].username);
  t.is(infoAfterUpdate.phone_number_hash, t.context.users[0].phoneNumberHash);
});

test("Appreciation to a non-user, that person signs up and the appreciation is executed post signup and referral gets the referral reward.", async (t) => {
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Wait one block to check that transaction not included into the block
  await delay(12000);

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);
  // Wait one block to check that transaction not included into the block
  await delay(12000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[1].pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.falsy(info);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );

  // Get information about sender of appreciation
  const senderInfo = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[0].pair.address
  );
  t.is(senderInfo.account_id, t.context.users[0].pair.address);
  t.is(senderInfo.user_name, t.context.users[0].username);
  t.is(senderInfo.phone_number_hash, t.context.users[0].phoneNumberHash);
  t.truthy(
    assertBalance(senderInfo.balance, 10 * KCoin - KCoin + REFERRAL_REWARD)
  );
  t.truthy(
    senderInfo.trait_scores.find(
      (traitScore) => traitScore.trait_id === REFERRAL
    )
  );

  // Get information about receiver of appreciation
  const receiverInfo =
    await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
      t.context.users[1].pair.address
    );
  t.is(receiverInfo.account_id, t.context.users[1].pair.address);
  t.is(receiverInfo.user_name, t.context.users[1].username);
  t.is(receiverInfo.phone_number_hash, t.context.users[1].phoneNumberHash);
  // Coins send with appreciation + signup reward
  t.truthy(assertBalance(receiverInfo.balance, KCoin + 10 * KCoin));
  t.truthy(
    receiverInfo.trait_scores.find(
      (traitScore) => traitScore.trait_id === MINDFUL
    )
  );
});

test("Appreciation by phone number", async (t) => {
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  // Wait one block to check that transaction not included into the block
  await delay(12000);

  await t.context.api.tx.appreciation
    .appreciation(
      { PhoneNumberHash: t.context.users[1].phoneNumberHash },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);
  // Wait one block to check that transaction not included into the block
  await delay(12000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[1].pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.falsy(info);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );

  // Get information about sender of appreciation
  const senderInfo = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[0].pair.address
  );
  t.is(senderInfo.account_id, t.context.users[0].pair.address);
  t.is(senderInfo.user_name, t.context.users[0].username);
  t.is(senderInfo.phone_number_hash, t.context.users[0].phoneNumberHash);
  t.truthy(
    assertBalance(senderInfo.balance, 10 * KCoin - KCoin + REFERRAL_REWARD)
  );
  t.truthy(
    senderInfo.trait_scores.find(
      (traitScore) => traitScore.trait_id === REFERRAL
    )
  );

  // Get information about receiver of appreciation
  const receiverInfo =
    await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
      t.context.users[1].pair.address
    );
  t.is(receiverInfo.account_id, t.context.users[1].pair.address);
  t.is(receiverInfo.user_name, t.context.users[1].username);
  t.is(receiverInfo.phone_number_hash, t.context.users[1].phoneNumberHash);
  // Coins send with appreciation + signup reward
  t.truthy(assertBalance(receiverInfo.balance, KCoin + 10 * KCoin));
  t.truthy(
    receiverInfo.trait_scores.find(
      (traitScore) => traitScore.trait_id === MINDFUL
    )
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

  await Promise.all([firstUserRegistration, secondUserRegistration]);

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      MINDFUL
    )
    .signAndSend(t.context.users[0].pair);

  // Wait one block while transaction processed
  await delay(12000);

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[1].pair.address
  );
  t.is(info.account_id, t.context.users[1].pair.address);
  t.is(info.user_name, t.context.users[1].username);
  t.is(info.phone_number_hash, t.context.users[1].phoneNumberHash);
  // Coins send with appreciation + signup reward
  t.truthy(assertBalance(info.balance, KCoin + 10 * KCoin));
  t.truthy(
    info.trait_scores.find((traitScore) => traitScore.trait_id === MINDFUL)
  );
});

test("Payment transaction (w/o an appreciation) between a user and non-user. The receiver signs up and gets the coin sent to it in the transaction.", async (t) => {
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  await t.context.api.tx.appreciation
    .appreciation(
      { AccountId: t.context.users[1].pair.address },
      KCoin,
      null,
      null
    )
    .signAndSend(t.context.users[0].pair);

  // Wait one block while transaction processed
  await delay(12000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
    t.context.users[1].pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.falsy(info);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.users[1].pair,
    t.context.users[1].username,
    t.context.users[1].phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterRegistration =
    await t.context.api.rpc.identity.getUserInfoByAccountId.raw(
      t.context.users[1].pair.address
    );
  t.is(
    infoAfterRegistration.account_id, t.context.users[1].pair.address
  );
  t.is(infoAfterRegistration.user_name, t.context.users[1].username);
  t.is(
    infoAfterRegistration.phone_number_hash, t.context.users[1].phoneNumberHash
  );
  // Coins send with appreciation + signup reward
  t.truthy(assertBalance(infoAfterRegistration.balance, KCoin + 10 * KCoin));
});
