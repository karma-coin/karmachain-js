/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "@babel/polyfill";
import "./interfaces/augment-api.js";
import "./interfaces/augment-types.js";
import * as definitions from "./interfaces/definitions.js";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";

const BYPASS_TOKEN = "dummy";

// an api context
export var context;

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

// Jscript channel names for client provided channel callbacks
export const NEW_USER_EVENT_CHANNEL_NAME = "newUserEventCallback";
export const TRANSFER_EVENT_CHANNEL_NAME = "transferEventCallback";
export const APPRECIATION_EVENT_CHANNEL_NAME = "appreciationEventCallback";
export const REWARD_EVENT_CHANNEL_NAME = "rewardEventCallback";

// Callbacks holder with default implementations. Client can override them
export var callbacks = {
  newUserEventCallback: (extrinsic, newUserEvent, userInfo, failed) => {
    // eslint-disable-next-line no-undef
    sendMessage(NEW_USER_EVENT_CHANNEL_NAME, {
      extrinsic: extrinsic,
      newUserEvent: newUserEvent,
      userInfo: userInfo,
      failed: failed,
    });
  },
  transferEventCallback: (extrinsic, transferEvent, failed) => {
    // eslint-disable-next-line no-undef
    sendMessage(TRANSFER_EVENT_CHANNEL_NAME, {
      extrinsic: extrinsic,
      transferEvent: transferEvent,
      failed: failed,
    });
  },
  appreciationEventCallback: (extrinsic, appreciationEvent, failed) => {
    // eslint-disable-next-line no-undef
    sendMessage(APPRECIATION_EVENT_CHANNEL_NAME, {
      extrinsic: extrinsic,
      appreciationEvent: appreciationEvent,
      failed: failed,
    });
  },
  rewardEventCallback: (extrinsic, rewardEvent, failed) => {
    // eslint-disable-next-line no-undef
    sendMessage(REWARD_EVENT_CHANNEL_NAME, {
      extrinsic: extrinsic,
      rewardEvent: rewardEvent,
      failed: failed,
    });
  },
};

// Init the api with a node's ws url with optional test accounts for testing purposes
export async function init(url, createTestAccounts = false) {
  // setup the api's context
  context = {
    api: null,
    users: [],
    keyring: null,
    alice: null,
    bob: null,
  };

  // Setup connection to node
  context.api = await initApi(url);
  context.keyring = new Keyring({ type: "sr25519" });

  // on testnents it is useful to have alice and bob preloaded
  if (createTestAccounts) {
    // Setup some user accounts for testing
    for (let i = 0; i < 10; i++) {
      context.users[i] = generateUser(context.keyring);
    }
    // Add Alice private keys
    context.alice = context.keyring.addFromUri("//Alice");
    // Add Bob private keys
    context.bob = context.keyring.addFromUri("//Bob");
  }

  return context;
}

// Get a key pair from a mnemonic e.g. 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought'. Client should securily store the mnemonic and use it to create keypair in app session.
export function getKeyPairFromMnemonic(mnemonic, name) {
  return context.keyring.addFromUri(mnemonic, { name: name });
}

// Get a canonical hash for a phone number
export function getHash(phoneNumber) {
  return blake2AsHex(phoneNumber, 512);
}

// Generate a new BIP39 mnemonic from a random seed
export function generateMnemonic() {
  return mnemonicGenerate();
}

// Get account info for an account id
export async function getUserByAccountId(accountId) {
  return context.api.rpc.identity.getUserInfoByAccountId.raw(accountId);
}

// Get account info for an account id
export async function getUserByUserName(userName) {
  return context.api.rpc.identity.getUserInfoByUsername.raw(userName);
}

// Get account info for a phone number
export async function getUserByPhoneNumber(phoneNumber) {
  return context.api.rpc.identity.getUserInfoByPhoneNumber.raw(phoneNumber);
}

// Get all users in a community
export async function getUsersByCommunity(communityId) {
  return context.api.rpc.community.getAllUsers(communityId);
}

// Get contacts with optional prefix
export async function getContactsByCommunity(prefix, communityId) {
  return context.api.rpc.community.getContacts(prefix, communityId);
}

// Get leaderboard for a community
export async function getLeaderboard(communityId) {
  return context.api.rpc.community.getLeaderBoard(communityId);
}

// Get all on-chain txs to or from an account id
export async function getTransactions(accountId) {
  return context.api.rpc.transactions.getTransactions.raw(accountId);
}

export async function getBlockchainData() {
  return context.api.rpc.chain.getBlockchainData();
}

export async function getGenesisData() {
  return context.api.rpc.chain.getGenesisData();
}

var unsubscribeAccountEventsFunction = null;

// Unsubscribe from account events
export function unsubscribeAccountEvents() {
  if (unsubscribeAccountEventsFunction !== null) {
    unsubscribeAccountEventsFunction();
  }
}

// Subscribe to account events for a specific account
// Default callbacks will be used unless callback is provided as an argument
export async function subscribeAccountEvents(
  accountId,
  callback = accountEventsCallback
) {
  unsubscribeAccountEvents();
  unsubscribeAccountEventsFunction = subscribeAccountEventsImpl(
    context.api,
    accountId,
    callback
  );

  return unsubscribeAccountEventsFunction;
}

/**
 * Determine does event belong to specific account
 * @param event
 * @param accountId
 * @returns {boolean}
 */
export function eventBelongToAccount(event, accountId) {
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

// Karmachain transactions below

// Signup a new user
export async function signupUser(pair, username, phoneNumber) {
  return createNewUser(context.api, pair, username, phoneNumber);
}

// Send an appreciation by phone number
export async function appreciateWithPhoneNumber(
  keyPair,
  phoneNumberHash,
  amount,
  communityId,
  charTrait
) {
  return context.api.tx.appreciation
    .appreciation(
      { PhoneNumberHash: phoneNumberHash },
      amount,
      communityId,
      charTrait
    )
    .signAndSend(keyPair);
}

export async function simpleTransfer(keyPair, accountId, amount) {
  return context.api.tx.balances
    .transfer(accountId, amount)
    .signAndSend(keyPair);
}

// end of karmachain transactions

// a default events callback implementation - calls back user-provided callback functions
export async function accountEventsCallback(extrinsic, events, failed) {
  if (context.api.tx.identity.newUser.is(extrinsic)) {
    events.forEach(async (event) => {
      if (context.api.events.identity.NewUser.is(event.event)) {
        // get user info
        const userInfo = await getUserByAccountId(event.event.data.accountId);
        if (callbacks.newUserEventCallback !== undefined) {
          callbacks.newUserEventCallback(
            extrinsic,
            event.event,
            userInfo,
            failed
          );
        }
      } else if (context.api.events.reward.RewardIssued.is(event.event)) {
        if (callbacks.rewardEventCallback != undefined) {
          callbacks.rewardEventCallback(extrinsic, event.event, failed);
        }
      }
    });
  }

  // A transfer tx (w/o an appreciation). e.g. from generic web ui
  if (context.api.tx.balances.transfer.is(extrinsic)) {
    const transferEvent = events.find((event) =>
      context.api.events.balances.Transfer.is(event.event)
    );

    if (transferEvent) {
      if (callbacks.transferEventCallback !== undefined) {
        callbacks.transferEventCallback(extrinsic, transferEvent, failed);
      }
    }
  }

  // An appreciation tx
  if (context.api.tx.appreciation.appreciation.is(extrinsic)) {
    events.forEach((event) => {
      if (context.api.events.appreciation.Appreciation.is(event.event)) {
        if (callbacks.appreciationEventCallback !== undefined) {
          callbacks.appreciationEventCallback(extrinsic, event.event, failed);
        }
      } else if (context.api.events.reward.RewardIssued.is(event.event)) {
        if (callbacks.rewardEventCallback != undefined) {
          callbacks.rewardEventCallback(extrinsic, event.event, failed);
        }
      }
    });
  }

  if (context.api.tx.reward.submitKarmaRewards.is(extrinsic)) {
    events.forEach((event) => {
      if (context.api.events.reward.RewardIssued.is(event.event)) {
        if (callbacks.rewardEventCallback != undefined) {
          callbacks.rewardEventCallback(extrinsic, event.event, failed);
        }
      }
    });
  }
}

// Subscrie to account event with the provided callback
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

      callback(extrinsic, events);
    });
  });
}

//
/// internal helper functions below
//

// Create a new user
async function createNewUser(api, pair, username, phoneNumber) {
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

// helper function to generate a test users
function generateUser(keyring) {
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

async function subscribeAccountEventsImpl(api, accountId, callback) {
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
        eventBelongToAccount(event, accountId)
      );

      const failed = events.find((event) =>
        api.events.system.ExtrinsicFailed.is(event)
      );

      if (belongToAccount) {
        callback(extrinsic, events, failed);
      }
    });
  });
}
