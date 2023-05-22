# Karmachain.js
An npm package providing the Karmachain api to javascript clients and beyond

## Generating karmachain.json
1. Run a local Karmachain node.
 
2. From this repo root dir run the following to set the content of karmachain.json with metadata from a karmachain node:

```bash
yarn load:meta
```

## Generating types
```bash
yarn generate
yarn lint
```

## docs and tutorial
https://polkadot.js.org/docs/api/examples/promise/typegen/

## Test

Firstly need to run local Karmachain node in verifier node. More information about node configuration
can be found in tests documentation. Tests automatically add verifier key using next command:s

```bash
curl --location 'http://localhost:9933/' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "author_insertKey",
    "params": {
        "key_type": "Veri",
        "suri": "//Alice",
        "public": "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"
    }
}'
```

To run tests:

```bash
yarn test
```