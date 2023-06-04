// Required imports
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import * as definitions from "../src/interfaces/definitions.js";
import { decodeAddress } from "@polkadot/util-crypto";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export const BYPASS_TOKEN = "dummy";
// Amount of tokens equal to one KarmaCoin
export const KCoin = 1000000;
// Character trait id for mindful trait
export const MINDFUL = 33;
// Character trait id for referral trait
export const REFERRAL = 41;
export const NO_COMMUNITY_ID = 0;
export const NO_CHAR_TRAIT_ID = 0;

// Initialize connection to node and decorate custom types & RPC
export async function init() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider("ws://127.0.0.1:9944");

  // Load custom types & rpc definitions for API
  const types = Object.values(definitions).reduce(
    (res, { types }) => ({ ...res, ...types }),
    {}
  );
  const rpc = Object.values(definitions).reduce(
    (res, { rpc }) => ({ ...res, ...rpc }),
    {}
  );

  // Create the API and wait until ready
  return await ApiPromise.create({
    provider,
    types: {
      ...types,
    },
    rpc: {
      ...rpc,
    },
  });
}

export async function defaultSetup(t) {
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

  // Set tests timeout for 2 minutes
  t.timeout(120000);
}

export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Generate random string useful for username and phone number generation
 *
 * @param len - target string length
 * @param charSet - characters that can appear in target string
 * @returns {string} - randomly generated string
 */
export function randomString(len, charSet) {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

export function generateUser(keyring) {
  // Generating random username
  const username = randomString(5);
  // Generating random phone number
  const phoneNumber = randomString(10, "01234567890");
  // Generating mnemonic and keys pair
  const mnemonic = mnemonicGenerate();
  const pair = keyring.addFromUri(mnemonic, {
    name: username,
  });

  return { username, phoneNumber, pair };
}

export async function call_new_user(api, pair, username, phoneNumber) {
  // Verify user data, using bypass token to skip firebase check
  let evidence = await api.rpc.verifier.verify.raw(
    pair.address,
    username,
    phoneNumber,
    BYPASS_TOKEN
  );

  // Sign and send `newUser` transaction
  await api.tx.identity
    .newUser(
      // Converting `AccountId` to `PublicKey`
      decodeAddress(evidence.verifier_account_id),
      // Have to add `0x` prefix for correct encode signature
      "0x" + evidence.signature,
      evidence.account_id,
      evidence.username,
      evidence.phone_number
    )
    .signAndSend(pair);

  // Wait one block while transaction processed
  await delay(12000);
}

export async function subscribeAccountEvents(api, accountId, callback) {
  return api.rpc.chain.subscribeFinalizedHeads(async (header) => {
    const blockHash = await api.rpc.chain.getBlockHash(header.number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    signedBlock.block.extrinsics.forEach(async (extrinsic, index) => {
      const allRecords = await api.query.system.events.at(blockHash);
      // Filter only complete transactions events
      const events = allRecords.filter(
        ({ phase }) =>
          phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
      );

      // Check if events belong to specific account
      const belongToAccount = events.find((event) =>
        isEventBelongToAccount(event, accountId)
      );

      if (belongToAccount) {
        callback(extrinsic, events);
      }
    });
  });
}

/**
 * Determine does event belong to specific account
 * @param event
 * @param accountId
 * @returns {boolean}
 */
function isEventBelongToAccount(event, accountId) {
  let flag = false;
  const types = event.event.typeDef;

  // Loop through each of the parameters, displaying the type and data
  event.event.data.forEach((data, index) => {
    if (types[index].type === "AccountId32" && data.eq(accountId)) {
      flag = true;
    }
  });

  return flag;
}
