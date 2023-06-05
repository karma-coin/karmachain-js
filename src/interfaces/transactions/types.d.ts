import type { Bytes, Enum, Option, Struct, Vec } from '@polkadot/types-codec';
import type { AccountId } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';
import type { UserInfo } from 'karmachain-js/interfaces/identity';
/** @name GetTransactionResponse */
export interface GetTransactionResponse extends Struct {
    readonly transactions: Vec<SignedTransactionWithStatus>;
    readonly tx_events: Vec<Event>;
}
/** @name GetTransactionsFromHashesResponse */
export interface GetTransactionsFromHashesResponse extends Struct {
    readonly transactions: Vec<SignedTransactionWithStatus>;
    readonly tx_events: Vec<Event>;
}
/** @name GetTransactionsResponse */
export interface GetTransactionsResponse extends Struct {
    readonly transactions: Vec<SignedTransactionWithStatus>;
    readonly tx_events: Vec<Event>;
}
/** @name SignedTransaction */
export interface SignedTransaction extends Struct {
    readonly signer: Option<AccountId>;
    readonly transaction_body: Bytes;
    readonly signature: Option<Bytes>;
}
/** @name SignedTransactionWithStatus */
export interface SignedTransactionWithStatus extends Struct {
    readonly signed_transaction: SignedTransaction;
    readonly status: TransactionStatus;
    readonly from: Option<UserInfo>;
    readonly to: Option<UserInfo>;
}
/** @name TransactionStatus */
export interface TransactionStatus extends Enum {
    readonly isUnknown: boolean;
    readonly isNotSubmitted: boolean;
    readonly isSubmitted: boolean;
    readonly isRejected: boolean;
    readonly isOnChain: boolean;
    readonly type: 'Unknown' | 'NotSubmitted' | 'Submitted' | 'Rejected' | 'OnChain';
}
export type PHANTOM_TRANSACTIONS = 'transactions';
