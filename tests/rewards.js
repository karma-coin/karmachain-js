import {
  call_new_user,
  defaultSetup,
  delay, KCoin,
  subscribeAccountEvents
} from "./utils.js";
import anyTest from "ava";

const test = anyTest;

test.beforeEach(async (t) => await defaultSetup(t));

test("Karma rewards work fine", async (t) => {
  await call_new_user(
    t.context.api,
    t.context.users[0].pair,
    t.context.users[0].username,
    t.context.users[0].phoneNumber
  );

  const unsubscribe = await subscribeAccountEvents(
    t.context.api,
    t.context.users[0].pair.address,
    (extrinsic, events) => {
      if (t.context.api.tx.reward.submitKarmaRewards.is(extrinsic)) {
        t.assert(
          events.find((event) =>
            t.context.api.events.reward.RewardIssued.is(event.event)
          )
        );
      }
    }
  );

  // Wait at least for 5 blocks in devnet
  await delay(60000);

  const info = await t.context.api.rpc.identity.getUserInfoByAccount.raw(
    t.context.users[0].pair.address
  );

  // signup reward + karma rewards
  t.assert(info.balance === 10 * KCoin + 10 * KCoin);

  unsubscribe();
});
