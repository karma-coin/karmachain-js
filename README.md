## Generating karmachain.json
1. Run a local Karmachain node
2. 

```bash
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```

3. Copy output into karmachin.json

## Generating types
```bash
yarn build
yarn lint
```

## docs and tutorial
https://polkadot.js.org/docs/api/examples/promise/typegen/

