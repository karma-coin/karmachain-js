import type { Bytes, Enum, Struct, Text } from '@polkadot/types-codec';
import type { AccountId } from '@polkadot/types/interfaces/runtime';
/** @name VerificationResponse */
export interface VerificationResponse extends Struct {
    readonly verifier_account_id: AccountId;
    readonly verification_result: VerificationResult;
    readonly account_id: AccountId;
    readonly phone_number: Text;
    readonly username: Text;
    readonly signature: Bytes;
}
/** @name VerificationResult */
export interface VerificationResult extends Enum {
    readonly isUnspecified: boolean;
    readonly isUserNameTaken: boolean;
    readonly isVerified: boolean;
    readonly isUnverified: boolean;
    readonly isMissingData: boolean;
    readonly isInvalidSignature: boolean;
    readonly isAccountMismatch: boolean;
    readonly type: 'Unspecified' | 'UserNameTaken' | 'Verified' | 'Unverified' | 'MissingData' | 'InvalidSignature' | 'AccountMismatch';
}
export type PHANTOM_VERIFIER = 'verifier';
