import express from 'express';
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import * as definitions from "karmachain2-js/src/interfaces/definitions.js";
import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";
// import { decodeAddress } from "@polkadot/util-crypto";
// import karmachain2 from 'karmachain2-js';
const app = express();
const port = 3000;

export const BYPASS_TOKEN = "dummy";
// Amount of tokens equal to one KarmaCoin
export const KCoin = 1000000;
// Amount of karma reward
export const KARMA_REWARD = 10 * KCoin;
export const REFERRAL_REWARD = 10 * KCoin;
// Character trait id for mindful trait
export const MINDFUL = 33;
// Character trait id for referral trait
export const REFERRAL = 41;
export const NO_COMMUNITY_ID = 0;
export const NO_CHAR_TRAIT_ID = 0;

const wsUrl = 'ws://127.0.0.1:9944';

var context = {
    api: null,
    users: [],
    keyring: null,
    alice: null,
    bob: null,
}
 
app.get('/', async (req, res) => {
  const c = await init();
  res.send('Hello World!' + c.users[0].username);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Initialize connection to node and decorate custom types & RPC
async function initApi(url) {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider(url);

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

export async function init() {

  // Setup connection to node
  context.api = await initApi(wsUrl);

  context.keyring = new Keyring({ type: "sr25519" });

  // Setup some user accounts
  for (let i = 0; i < 10; i++) {
    context.users[i] = generateUser(context.keyring);
  }

  // Add Alice private keys
  context.alice = context.keyring.addFromUri("//Alice");
  // Add Bob private keys
  context.bob = context.keyring.addFromUri("//Bob");
  
  return context;
}

export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function assertBalance(actual, expected) {
  const result = actual === expected || actual === expected + KARMA_REWARD;

  if (!result) {
    console.log(`Balance mismatch. Expected: ${expected} | Actual: ${actual}`);
  }

  return result;
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
  // Hashing phone number
  const phoneNumberHash = blake2AsHex(phoneNumber, 512);
  // Generating mnemonic and keys pair
  const mnemonic = mnemonicGenerate();
  const pair = keyring.addFromUri(mnemonic, {
    name: username,
  });

  return { username, phoneNumber, phoneNumberHash, pair };
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
      // TODO: Uncomment this when verifing evidence will be enabled
      // Converting `AccountId` to `PublicKey`
      // decodeAddress(evidence.verifier_account_id),
      // Have to add `0x` prefix for correct encode signature
      // "0x" + evidence.signature,
      evidence.account_id,
      evidence.username,
      evidence.phone_number_hash
    )
    .signAndSend(pair);

  // Wait one block while transaction processed
  await delay(12000);
}

export async function subscribeEvents(api, callback) {
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
      
      callback(extrinsic, events)
    })
  });
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
