/*
    Example jscript wrapper to be used in dart clients
*/

import * as api from "./index.js";

// local default node ws endpoint
export const wsUrl = "ws://127.0.0.1:9944";

export async function init(url, createTestAccounts) {
  // init the api using a local node ws endpoint with test accounts
  await api.init(url, createTestAccounts);
}

// Subscribe to events related to accountAddress. Call this when user signs-in to client.
export async function subscribeToEvent(accountAddress) {
  const unsubscribe = await api.subscribeAccountEvents(accountAddress);
  return unsubscribe;
}

// Stop receiving account-related callbacks. Call this when user signs out from client.
export async function unsubscribeAccountEvents() {
  api.unsubscribeAccountEvents();
}
