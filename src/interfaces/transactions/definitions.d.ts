declare const _default: {
  types: {
    TransactionStatus: {
      _enum: string[];
    };
    SignedTransaction: {
      signer: string;
      transaction_body: string;
      signature: string;
    };
    SignedTransactionWithStatus: {
      signed_transaction: string;
      status: string;
      from: string;
      to: string;
    };
    GetTransactionResponse: {
      transactions: string;
      tx_events: string;
    };
    GetTransactionsFromHashesResponse: {
      transactions: string;
      tx_events: string;
    };
    GetTransactionsResponse: {
      transactions: string;
      tx_events: string;
    };
  };
  rpc: {
    transactions: {
      getTx: {
        description: string;
        params: {
          name: string;
          type: string;
        }[];
        type: string;
      };
      getTxWithEvents: {
        description: string;
        params: {
          name: string;
          type: string;
        }[];
        type: string;
      };
      getTransaction: {
        description: string;
        params: {
          name: string;
          type: string;
        }[];
        type: string;
      };
      getTransactionsFromHashes: {
        description: string;
        params: {
          name: string;
          type: string;
        }[];
        type: string;
      };
      getTransactions: {
        description: string;
        params: {
          name: string;
          type: string;
        }[];
        type: string;
      };
    };
  };
};
export default _default;
