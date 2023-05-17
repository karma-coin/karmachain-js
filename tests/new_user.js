import {
  init,
  delay,
  BYPASS_TOKEN,
  ALICE,
  randomString,
  call_new_user,
  MINDFUL,
  KCoin,
} from "./utils.js";
import anyTest from "ava";
import { Keyring } from "@polkadot/api";
import { mnemonicGenerate } from "@polkadot/util-crypto";

const test = anyTest;

test.beforeEach(async (t) => {
  // Setup connection to node
  t.context.api = await init();
  // Generating random username
  t.context.username = randomString(5);
  // Generating random phone number
  t.context.phoneNumber = randomString(10, "01234567890");
  // Setup crypto key manager
  t.context.keyring = new Keyring({ type: "sr25519" });
  // Generating mnemonic and keys pair
  const mnemonic = mnemonicGenerate();
  t.context.pair = t.context.keyring.addFromUri(mnemonic, {
    name: t.context.name,
  });
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
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.pair.address
  );

  t.assert(info.account_id === t.context.pair.address);
  t.assert(info.user_name === t.context.username);
  t.assert(info.mobile_number === t.context.phoneNumber);
});

test("Signup when already signed up on a different device", async (t) => {
  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.pair.address
  );

  t.assert(info.account_id === t.context.pair.address);
  t.assert(info.user_name === t.context.username);
  t.assert(info.mobile_number === t.context.phoneNumber);

  // Generating new mnemonic and keys pair
  const mnemonic = mnemonicGenerate();
  t.context.pair = t.context.keyring.addFromUri(mnemonic, {
    name: t.context.name,
  });

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterUpdate =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.pair.address
    );
  t.assert(infoAfterUpdate.account_id === t.context.pair.address);
  t.assert(infoAfterUpdate.user_name === t.context.username);
  t.assert(infoAfterUpdate.mobile_number === t.context.phoneNumber);
});

test("Appreciation to a non-user, that person signs up and the appreciation is executed post signup and referral gets the referral reward.", async (t) => {
  await t.context.api.tx.appreciation
    .appreciation({ AccountId: t.context.pair.address }, KCoin, null, MINDFUL)
    .signAndSend(t.context.alice);

  // Wait one block to check that transaction not included into the block
  await delay(60000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.assert(info === null);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterRegistration =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.pair.address
    );
  t.assert(infoAfterRegistration.account_id === t.context.pair.address);
  t.assert(infoAfterRegistration.user_name === t.context.username);
  t.assert(infoAfterRegistration.mobile_number === t.context.phoneNumber);
  // Coins send with appreciation + signup reward
  t.assert(infoAfterRegistration.balance === KCoin + 10 * KCoin);
  t.assert(
    infoAfterRegistration.trait_scores.find(
      (traitScore) => traitScore.trait_id === MINDFUL
    ) != null
  );
});

test("Appreciation of an existing user.", async (t) => {
  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  const unsub = await t.context.api.tx.appreciation
    .appreciation({ AccountId: t.context.pair.address }, KCoin, null, MINDFUL)
    .signAndSend(t.context.alice, (result) => {
      if (result.status.isFinalized) {
        unsub();
      }
    });

  // Wait one block while transaction processed
  await delay(60000);

  // Get information about user by `AccountId`
  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.pair.address
  );
  t.assert(info.account_id === t.context.pair.address);
  t.assert(info.user_name === t.context.username);
  t.assert(info.mobile_number === t.context.phoneNumber);
  t.assert(
    info.trait_scores.find((traitScore) => traitScore.trait_id === MINDFUL) !=
      null
  );
  // Coins send with appreciation + signup reward
  t.assert(info.balance === KCoin + 10 * KCoin);
  t.assert(
    info.trait_scores.find((traitScore) => traitScore.trait_id === MINDFUL) !=
      null
  );
});

test("Payment transaction (w/o an appreciation) between a user and non-user. The receiver signs up and gets the coin sent to it in the transaction.", async (t) => {
  await t.context.api.tx.appreciation
    .appreciation({ AccountId: t.context.pair.address }, KCoin, null, null)
    .signAndSend(t.context.alice);

  // Wait one block while transaction processed
  await delay(60000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.pair.address
  );
  // No user information should be provided, because user not registered on chain
  t.assert(info === null);

  // Call `new_user` tx to register user
  await call_new_user(
    t.context.api,
    t.context.pair,
    t.context.username,
    t.context.phoneNumber
  );

  // Get information about user by `AccountId`
  const infoAfterRegistration =
    await t.context.api.rpc.identity.getUserInfoByAccount.raw(
      t.context.pair.address
    );
  t.assert(infoAfterRegistration.account_id === t.context.pair.address);
  t.assert(infoAfterRegistration.user_name === t.context.username);
  t.assert(infoAfterRegistration.mobile_number === t.context.phoneNumber);
  // Coins send with appreciation + signup reward
  t.assert(infoAfterRegistration.balance === KCoin + 10 * KCoin);
});

test.todo("Update user name.");
