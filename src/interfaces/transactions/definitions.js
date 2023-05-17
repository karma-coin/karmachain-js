export default {
    types: {
        TransactionStatus: {
            _enum: [
                `Unknown`,
                `NotSubmitted`,
                `Submitted`,
                `Rejected`,
                `OnChain`,
            ]
        },
        SignedTransaction: {
            signer: 'Option<AccountId>',
            transaction_body: 'Vec<u8>',
            signature: 'Option<Vec<u8>>',
        },
        SignedTransactionWithStatus: {
            signed_transaction: 'SignedTransaction',
            status: 'TransactionStatus',
            from: 'Option<UserInfo>',
            to: 'Option<UserInfo>',
        },
        GetTransactionResponse: {
            transactions: 'Vec<SignedTransactionWithStatus>',
            tx_events: 'Vec<Event>'
        },
        GetTransactionsFromHashesResponse: {
            transactions: 'Vec<SignedTransactionWithStatus>',
            tx_events: 'Vec<Event>'
        },
        GetTransactionsResponse: {
            transactions: 'Vec<SignedTransactionWithStatus>',
            tx_events: 'Vec<Event>'
        }
    },
    rpc: {
        transactions: {
            getTx: {
                description: 'Provides transaction details by block number and transaction index',
                params: [
                    {
                        name: 'block_number',
                        type: 'u32',
                    },
                    {
                        name: 'tx_index',
                        type: 'u32',
                    }
                ],
                type: 'SignedTransactionWithStatus'
            },
            getTxWithEvents: {
                description: 'Provides transaction details and transaction events by block number and transaction index',
                params: [
                    {
                        name: 'block_number',
                        type: 'u32',
                    },
                    {
                        name: 'tx_index',
                        type: 'u32',
                    }
                ],
                type: '[SignedTransactionWithStatus, Vec<Event>]'
            },
            getTransaction: {
                description: 'Provides transaction details by transaction hash',
                params: [
                    {
                        name: 'tx_hash',
                        type: 'Hash'
                    }
                ],
                type: 'GetTransactionResponse'
            },
            getTransactionsFromHashes: {
                description: 'Provides transactions details by transactions hashes',
                params: [
                    {
                        name: 'tx_hashes',
                        type: 'Vec<Hash>'
                    }
                ],
                type: 'GetTransactionsFromHashesResponse',
            },
            getTransactions: {
                description: 'Provides transactions, that belong to specific account',
                params: [
                    {
                        name: 'account_id',
                        type: 'AccountId'
                    }
                ],
                type: 'GetTransactionsResponse'
            }
        }
    },
};
