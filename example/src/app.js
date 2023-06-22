/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";
import * as karmaChainApi from "karmachain2-js/src/index.js";

// an api context
var context;

// Init the api with a ws url
async function init(url) {
  context = await karmaChainApi.init(url);
}

// Get a key pair from a mnemonic e.g. 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought'. Client should securily store the mnemonic and use it to create keypair in app session.
function getKeyPairFromMnemonic(mnemonic, name) {
  return context.keyring.addFromUri(mnemonic, { name: name });
}

// Get a canonical hash for a phone number
function getHash(phoneNumber) {
  return blake2AsHex(phoneNumber, 512);
}

// Generate a new BIP39 mnemonic
function generateMnemonic() {
  return mnemonicGenerate();
}

// Get account info for an account id
async function getUserByAccountId(accountId) {
  return context.api.rpc.identity.getUserInfoByAccountId.raw(accountId);
}

// Get account info for an account id
async function getUserByUserName(userName) {
  return context.api.rpc.identity.getUserInfoByUsername.raw(userName);
}

// Get account info for a phone number
async function getUserByPhoneNumber(phoneNumber) {
  return context.api.rpc.identity.getUserInfoByPhoneNumber.raw(phoneNumber);
}

// Get all users in a community
async function getUsersByCommunity(communityId) {
  return context.api.rpc.community.getAllUsers(communityId);
}

// Get contacts with optional prefix
async function getContactsByCommunity(prefix, communitId) {
  return context.api.rpc.community.getContacts(prefix, communityId);
}

// Get leaderboard for a community
async function getLeaderboard(communityId) {
  return context.api.rpc.community.getLeaderBoard(communityId);
}

// Get all on-chain txs to or from an account id
async function getTransactions(accountId) {
  return context.api.rpc.transactions.getTransactions.raw(accountId);
}

async function subscribeAccountEvents(accountId, callback) {
  return karmaChainApi.subscribeAccountEvents(context.api, accountId, callback);
}

// Create an on-chain user account
async function createUser(keyPair, userName, phoneNumber) {
  if (context === undefined) {
    throw new Error("Context is undefined. Call init() first.");
  }

  await karmaChainApi.call_new_user(
    context.api,
    keyPair,
    userName,
    phoneNumber
  );
}

async function appreciateWithPhoneNumber(
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

// async function (Extrinsic, NewUserEvent, UserInfo)
var newUserEventCallback;

// Fired for amount transfer which is not an appreicaiton
// async function (Extrinsic, TransferEvent)
var transferEventCallback;

// async function (Extrinsic, AppreciationEvent)
var appreciationEventCallback;

// a default events callback implementation - calls back user-provided callback functions
// set by the user of this library - see above
async function accountEventCallback(extrinsic, events) {
  if (context.api.tx.identity.newUser.is(extrinsic)) {
    const newUserEvent = events.find((event) =>
      context.api.events.identity.NewUser.is(event.event)
    );
    if (newUserEvent) {
      // get user info
      const userInfo = await getUserByAccountId(context.users[0].pair.address);
      if (newUserEventCallback !== undefined) {
        newUserEventCallback(extrinsic, newUserEvent, userInfo);
      }
    }
  }

  if (context.api.tx.balances.transfer.is(extrinsic)) {
    const transferEvent = events.find((event) =>
      context.api.events.balances.Transfer.is(event.event)
    );

    if (transferEvent) {
      if (transferEventCallback !== undefined) {
        transferEventCallback(extrinsic, transferEvent);
      }
    }
  }

  if (context.api.tx.appreciation.appreciation.is(extrinsic)) {
    const appreciationEvent = events.find((event) =>
      context.api.events.appreciation.Appreciation.is(event.event)
    );

    if (appreciationEvent) {
      if (appreciationEventCallback !== undefined) {
        appreciationEventCallback(extrinsic, appreciationEvent);
      }
    }
  }
}

//
///////// example usage playground below
//
//

// local default node ws endpoint
const wsUrl = "ws://127.0.0.1:9944";

// helper funciton
export function delay(milliseconds) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(resolve, milliseconds);
  });
}

// init the api using a local node ws endpoint
await init(wsUrl);

// set api callbacks

// new user callback - should call back to dart app
newUserEventCallback = (extrinsic, newUserEvent, userInfo) => {
  const failed = context.api.events.system.ExtrinsicFailed.is(
    newUserEvent.event
  );

  console.log(
    "New user event. User name: " +
      userInfo.user_name +
      ", phone hash: " +
      userInfo.phone_number_hash +
      ", status: " +
      (failed ? "failed" : "success")
  );
};

// appreciation callback
appreciationEventCallback = (extrinsic, appreciationEvent) => {
  const failed = context.api.events.system.ExtrinsicFailed.is(
    appreciationEvent.event
  );

  console.log(
    "Appreciation event. From: " +
      appreciationEvent.event.data.payer +
      ", to: " +
      appreciationEvent.event.data.payee +
      ", amount:" +
      appreciationEvent.event.data.amount +
      "status: " +
      (failed ? "failed" : "success")
  );
};

// subscribe to events using the default callback
const unsubscribe = await subscribeAccountEvents(
  context.users[0].pair.address,
  accountEventCallback
);

console.log("Creating new users...");

// create user
await createUser(
  context.users[0].pair,
  context.users[0].username,
  context.users[0].phoneNumber
);

// create another user
await createUser(
  context.users[1].pair,
  context.users[1].username,
  context.users[1].phoneNumber
);

await delay(24000);

console.log("Sending appreciation...");
await appreciateWithPhoneNumber(
  context.users[1].pair,
  context.users[0].phoneNumberHash,
  100,
  null,
  33
);
