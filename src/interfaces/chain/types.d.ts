import type { Bytes, Option, Struct, Text, Vec, u128, u32, u64 } from '@polkadot/types-codec';
import type { AccountId, Hash } from '@polkadot/types/interfaces/runtime';
/** @name BlockchainStats */
export interface BlockchainStats extends Struct {
    readonly last_block_time: u64;
    readonly tip_height: u64;
    readonly transaction_count: u64;
    readonly payment_transaction_count: u64;
    readonly appreciations_transactions_count: u64;
    readonly update_user_transactions_count: u64;
    readonly users_count: u64;
    readonly fees_amount: u128;
    readonly minted_amount: u128;
    readonly circulation: u128;
    readonly fee_subs_count: u64;
    readonly fee_subs_amount: u128;
    readonly signup_rewards_count: u64;
    readonly signup_rewards_amount: u128;
    readonly referral_rewards_count: u64;
    readonly referral_rewards_amount: u128;
    readonly validator_rewards_count: u64;
    readonly validator_rewards_amount: u128;
    readonly causes_rewards_amount: u128;
}
/** @name CharTrait */
export interface CharTrait extends Struct {
    readonly id: u32;
    readonly name: Text;
    readonly emoji: Text;
}
/** @name GenesisData */
export interface GenesisData extends Struct {
    readonly net_id: u32;
    readonly net_name: Text;
    readonly genesis_time: u64;
    readonly signup_reward_phase1_alloc: u128;
    readonly signup_reward_phase2_alloc: u128;
    readonly signup_reward_phase1_amount: u128;
    readonly signup_reward_phase2_amount: u128;
    readonly signup_reward_phase3_start: u128;
    readonly referral_reward_phase1_alloc: u128;
    readonly referral_reward_phase2_alloc: u128;
    readonly referral_reward_phase1_amount: u128;
    readonly referral_reward_phase2_amount: u128;
    readonly tx_fee_subsidy_max_per_user: u64;
    readonly tx_fee_subsidies_alloc: u128;
    readonly tx_fee_subsidy_max_amount: u128;
    readonly block_reward_amount: u64;
    readonly block_reward_last_block: u64;
    readonly karma_reward_amount: u128;
    readonly karma_reward_alloc: u128;
    readonly karma_reward_top_n_users: u64;
    readonly char_traits: Vec<CharTrait>;
    readonly verifiers: Vec<PhoneVerifier>;
}
/** @name PhoneVerifier */
export interface PhoneVerifier extends Struct {
    readonly account_id: AccountId;
    readonly name: Text;
}
/** @name RpcBlock */
export interface RpcBlock extends Struct {
    readonly time: u64;
    readonly author: Option<AccountId>;
    readonly height: u32;
    readonly transaction_hashes: Vec<Hash>;
    readonly fees: u128;
    readonly signature: Bytes;
    readonly digest: Bytes;
}
export type PHANTOM_CHAIN = 'chain';
