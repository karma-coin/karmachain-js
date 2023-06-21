// import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
// import * as definitions from "karmachain2-js/src/interfaces/definitions.js";
// import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";
// import { decodeAddress } from "@polkadot/util-crypto";
import * as karmachainapi from 'karmachain2-js/src/index.js';


const wsUrl = 'ws://127.0.0.1:9944';

export function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
}

var context;


async function example() {

context = await karmachainapi.init(wsUrl);

  await karmachainapi.call_new_user(
    context.api,
    context.users[0].pair,
    context.users[0].username,
    context.users[0].phoneNumber
  );

  console.log("Creating new user - waiting for transaction to be included in block...");

  // wait up to 12 secs for transaction to be included in block
  await delay(120000);

  // Get information about user by `AccountId`
  const info = await context.api.rpc.identity.getUserInfoByAccountId.raw(
    context.users[0].pair.address
  );

  console.log("info: " + info);

  console.log('Hello World!' + context.users[0].username + ", " + info.user_name + ", " + info.phone_number_hash);
};

example();

