// Required imports
import { ApiPromise, WsProvider } from "@polkadot/api";
import * as definitions from "../src/interfaces/definitions.js";
import { decodeAddress } from "@polkadot/util-crypto";

export const BYPASS_TOKEN = "dummy";
// Amount of tokens equal to one KarmaCoin
export const KCoin = 1000000;
// Character trait id for mindful trait
export const MINDFUL = 33;

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
  await delay(60000);
}
