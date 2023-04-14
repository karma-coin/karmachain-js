# typegen docs
https://polkadot.js.org/docs/api/examples/promise/typegen/

edgeware.json provided as reference of a known good metadata.

## Generating karmachain.json
1. Run a local Karmachain node
2. 

```bash
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```

3. Copy output into karmachin.json

## Generating types
1. ```bash
yarn build
```

2. Lint generated typescript source files
```bash
yarn lint
```