/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import * as api from "karmachain2-js/src/index.js";

// local default node ws endpoint
const wsUrl = "ws://127.0.0.1:9944";

// init the api using a local node ws endpoint with test accounts
await api.init(wsUrl, true);

// setup a bunch of api events callbacks overriding the default ones

// new user callback - should call back to dart app
api.callbacks.newUserEventCallback = (
  extrinsic,
  newUserEvent,
  userInfo,
  failed
) => {
  console.log(
    "New user event. User name: " +
      userInfo.user_name +
      ", phone hash: " +
      userInfo.phone_number_hash +
      ", status: " +
      (failed ? "failed" : "success")
  );
};

// signup reward callback
api.callbacks.rewardEventCallback = (extrinsic, rewardEvent, failed) => {
  console.log(
    "Reward event. " +
      "Who: " +
      rewardEvent.data.who +
      ", amount: " +
      rewardEvent.data.amount +
      ", type: " +
      rewardEvent.data.rewardType +
      ", status: " +
      (failed ? "failed" : "success")
  );

  if (rewardEvent.data.rewardType.eq("Signup")) {
    console.log("Signup reward");
  }

  if (rewardEvent.data.rewardType.eq("Referral")) {
    console.log("Referral reward");
  }

  if (rewardEvent.data.rewardType.eq("Karma")) {
    console.log("Karma reward");
  }

  if (rewardEvent.data.rewardType.eq("Subsidy")) {
    console.log("TX fee swubsidy");
  }
};

// appreciation callback
api.callbacks.appreciationEventCallback = (
  extrinsic,
  appreciationEvent,
  failed
) => {
  console.log(
    "Appreciation event. From: " +
      appreciationEvent.data.payer +
      ", to: " +
      appreciationEvent.data.payee +
      ", amount:" +
      appreciationEvent.data.amount +
      ", status: " +
      (failed ? "failed" : "success")
  );
};

api.callbacks.transferEventCallback = (extrinsic, transferEvent, failed) => {
  console.log("Transfer event. " + transferEvent.event.toHuman());
};

// Fetch blockhain data
const blockchainData = await api.getBlockchainData();
const genesisData = await api.getGenesisData();
console.log("Blockchain data: " + blockchainData.toHuman());
console.log("Genesis data: " + genesisData.toHuman());

// Subscribe to events related a user account's address using the default callback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = await api.subscribeAccountEvents(
  api.context.users[0].pair.address
);

console.log("Creating new users...");

// create user
await api.signupUser(
  api.context.users[0].pair,
  api.context.users[0].username,
  api.context.users[0].phoneNumber
);

// create another user
await api.signupUser(
  api.context.users[1].pair,
  api.context.users[1].username,
  api.context.users[1].phoneNumber
);

await delay(24000);

console.log("Sending appreciation...");
await api.appreciateWithPhoneNumber(
  api.context.users[1].pair,
  api.context.users[0].phoneNumberHash,
  100,
  null,
  33
);

await delay(24000);

// send a simple transfer
await api.simpleTransfer(
  api.context.users[1].pair,
  api.context.users[0].pair.address,
  100
);

// helper funciton
export function delay(milliseconds) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(resolve, milliseconds);
  });
}

// call unsubscribe() to unsubscribe from events
