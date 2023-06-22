// import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
// import * as definitions from "karmachain2-js/src/interfaces/definitions.js";
// import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";
// import { decodeAddress } from "@polkadot/util-crypto";
import * as karmachainapi from 'karmachain2-js/src/index.js';

// local default node ws endpoint
const wsUrl = 'ws://127.0.0.1:9944';

export function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
}

var context;

async function init(url) {
    context = await karmachainapi.init(url);
}

// Get a key pair from a mnemonic e.g. 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought'. Client securily store the mnemonic and use it to create keys in app session.
function getKeyPairFromMnemonic(mnemonic, name) {
    return context.keyring.addFromUri(mnemonic, {name: name});
}

// Create an onchain user acccount
async function createUser(keyPair, userName, phoneNumber) {
    if (context === undefined) {
        throw new Error("Context is undefined. Call init() first.");
    }
    console.log("Creating new user tx...");
    await karmachainapi.call_new_user(
        context.api,
        keyPair,
        userName,
        phoneNumber
    );
};

// Get account info for an account id
async function getUserByAccountId(accountId) {
    return await context.api.rpc.identity.getUserInfoByAccountId.raw(accountId);
}

// Get account info for an account id
async function getUserByUserName(userName) {
    return await context.api.rpc.identity.getUserInfoByUsername.raw(userName);
}

// Get account info for a phone number
async function getUserByPhoneNumber(phoneNumber) {
    return await context.api.rpc.identity.getUserInfoByPhoneNumber.raw(phoneNumber);
}

// Get all users in a community
async function getUsersByCommunity(communityId) {
    return await context.api.rpc.community.getAllUsers(communityId);
}

// Get contcts with optional prefix
async function getContacts(prefix, communitId) {
    return await context.api.rpc.community.getContacts(prefix, communityId);
}

// Get leaderboard for a community
async function getLeaderboard(communityId) {
    return await context.api.rpc.community.getLeaderBoard(communityId);
}

async function subscribeAccountEvents(accountId, callback) {
    return await karmachainapi.subscribeAccountEvents(context.api, accountId, callback);
}

async function appreciate(keyPair, toPhoneNumber, amount) {
    return await context.api.tx.appreciation
      .appreciation(
        { phoneNumber: toPhoneNumber },
        amount,
        null,
        null
      )
      .signAndSend(keyPair);
  
}


///////// example usage below


// init the context
await init(wsUrl);

const unsubscribe = await subscribeAccountEvents(
    context.users[0].pair.address,
    (extrinsic, events) => {
      if (context.api.tx.identity.newUser.is(extrinsic)) {
        events.forEach((event) => {
            console.log(event.event.toHuman());
        });
        events.find(async (event) => {
            console.log(event.event);
            if (context.api.events.identity.NewUser.is(event.event)) {
                // get user info
                const userInfo = await getUserByAccountId(context.users[0].pair.address);
                console.log(userInfo.user_name, userInfo.phone_number_hash);
                unsubscribe();
            }
        });
        }
    });
    
// create a user
await createUser(context.users[0].pair, context.users[0].username, context.users[0].phoneNumber);

// send appreication by phone number



//PhoneNumber

