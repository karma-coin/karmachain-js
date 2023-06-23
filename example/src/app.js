/* eslint-disable no-undef */
import * as api from "karmachain2-js/src/index.js";

// local default node ws endpoint
const wsUrl = "ws://127.0.0.1:9944";

// init the api using a local node ws endpoint with test accounts
await api.init(wsUrl, true);

// setup a bunch of api events callbacks

// new user callback - should call back to dart app
api.callbacks.newUserEventCallback = (extrinsic, newUserEvent, userInfo) => {
  console.log(
    "New user event. User name: " +
      userInfo.user_name +
      ", phone hash: " +
      userInfo.phone_number_hash
  );
};

// signup reward callback
api.callbacks.signupRewardCallback = (extrinsic, signupRewardEvent) => {
  console.log("Signup reward event." + signupRewardEvent.toString());
};

// appreciation callback
api.callbacks.appreciationEventCallback = (extrinsic, appreciationEvent) => {
  console.log(
    "Appreciation event. From: " +
      appreciationEvent.event.data.payer +
      ", to: " +
      appreciationEvent.event.data.payee +
      ", amount:" +
      appreciationEvent.event.data.amount
  );
};

// coin transfer callback
api.callbacks.transferEventCallback = (extrinsic, transferEvent) => {
  console.log(transferEvent.toHuman());
};

// subscribe to events using the default callback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = await api.subscribeAccountEvents(
  api.context.users[0].pair.address,
  api.accountEventsCallback
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

console.log("Sending payment tx...");
await api.appreciateWithPhoneNumber(
  api.context.users[1].pair,
  api.context.users[0].phoneNumberHash,
  100,
  null,
  null
);

await delay(24000);

// todo: send simple coin transfer from 1 to 0

// todo: test getting all available chain meta-data from api here... e.g. netId, other params, chainspec?

// helper funciton
export function delay(milliseconds) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(resolve, milliseconds);
  });
}

// call unsubscribe() to unsubscribe from events...
