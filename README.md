# Karmachain.js
An npm package providing the Karmachain api to javascript clients and beyond.
Public releases are [published to npm](https://www.npmjs.com/package/karmachain2-js).

## Generating karmachain.json
1. Run a local Karmachain node.
 
2. From this repo root dir run the following to set the content of karmachain.json with metadata from a karmachain node:

```bash
yarn load:meta
```

## Generating types
```bash
yarn generate
```

## docs and tutorial
https://polkadot.js.org/docs/api/examples/promise/typegen/

## Testing

1. Run a local Karmachain node in verifier mode and with an enabled offchain worker. 

2. Run the tests

```bash
yarn test
```

Note that the tests config adds verifier and offchain keys using these commands so there's no need to manually run them.

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
curl --location 'http://localhost:9933/' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "author_insertKey",
    "params": {
        "key_type": "rewa",
        "suri": "//Alice",
        "public": "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"
    }
}'
```

## Publishing
```
npm publish
```
