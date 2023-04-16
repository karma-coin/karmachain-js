# Karmachain.js
An npm package providing the Karmachain api to javascript clients and beyond

## Generating karmachain.json
1. Run a local Karmachain node.
 
2. From this repo root dir run the following to set the content of karmachain.json with metadata from a karmachain node:

```bash
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933 > karmachain.json
```

## Generating types
```bash
yarn build
yarn lint
```

## docs and tutorial
https://polkadot.js.org/docs/api/examples/promise/typegen/
