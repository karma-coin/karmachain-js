import express from 'express';
// import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import * as definitions from "karmachain2-js/src/interfaces/definitions.js";
// import { mnemonicGenerate, blake2AsHex } from "@polkadot/util-crypto";
// import { decodeAddress } from "@polkadot/util-crypto";
import * as karmachainapi from 'karmachain2-js/src/index.js';

const app = express();
const port = 3000;

const wsUrl = 'ws://127.0.0.1:9944';

app.get('/', async (req, res) => {
  const c = await karmachainapi.initApi(wsUrl);
  res.send('Hello World!' + c.users[0].username);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

