// We need to import the augmented definitions "somewhere" in our project, however since we have
// it in tsconfig as an override and the api/types has imports, it is not strictly required here.
// Because of the tsconfig override, we could import from '@polkadot/{api, types}/augment'
import "./interfaces/augment-api.js";
import "./interfaces/augment-types.js";

// import * as definitions from "./interfaces/definitions.js";

import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";

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

// localhost node defualt ws url
const wsUrl = 'ws://127.0.0.1:9944';

// Init the api with a node's websocket url
export async function init(url) {

    // api context object
    const context = {
        api: null,
        users: [],
        keyring: null,
        alice: null,
        bob: null,
    }
 
  // Setup connection to node
  context.api = await initApi(url);
  context.keyring = new Keyring({ type: "sr25519" });

  // Setup some user accounts for testing
  for (let i = 0; i < 10; i++) {
    context.users[i] = generateUser(context.keyring);
  }

  // on testnents it is useful to have alice and bob preloaded

  // Add Alice private keys
  context.alice = context.keyring.addFromUri("//Alice");
  // Add Bob private keys
  context.bob = context.keyring.addFromUri("//Bob");
  
  return context;
}

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
  
