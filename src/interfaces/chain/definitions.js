/* eslint-disable @typescript-eslint/camelcase */
export default {
    types: {
        RpcBlock: {
            time: 'u64',
            author: 'Option<AccountId>',
            height: 'u32',
            transaction_hashes: 'Vec<Hash>',
            fees: 'u128',
            signature: 'Vec<u8>',
            digest: 'Vec<u8>'
        },
        BlockchainStats: {
            last_block_time: 'u64',
            tip_height: 'u64',
            transaction_count: 'u64',
            payment_transaction_count: 'u64',
            appreciations_transactions_count: 'u64',
            update_user_transactions_count: 'u64',
            users_count: 'u64',
            fees_amount: 'u128',
            minted_amount: 'u128',
            circulation: 'u128',
            fee_subs_count: 'u64',
            fee_subs_amount: 'u128',
            signup_rewards_count: 'u64',
            signup_rewards_amount: 'u128',
            referral_rewards_count: 'u64',
            referral_rewards_amount: 'u128',
            validator_rewards_count: 'u64',
            validator_rewards_amount: 'u128',
            causes_rewards_amount: 'u128'
        },
        GenesisData: {
            net_id: 'u32',
            net_name: 'Text',
            genesis_time: 'u64',
            signup_reward_phase1_alloc: 'u128',
            signup_reward_phase2_alloc: 'u128',
            signup_reward_phase1_amount: 'u128',
            signup_reward_phase2_amount: 'u128',
            signup_reward_phase3_start: 'u128',
            referral_reward_phase1_alloc: 'u128',
            referral_reward_phase2_alloc: 'u128',
            referral_reward_phase1_amount: 'u128',
            referral_reward_phase2_amount: 'u128',
            tx_fee_subsidy_max_per_user: 'u64',
            tx_fee_subsidies_alloc: 'u128',
            tx_fee_subsidy_max_amount: 'u128',
            block_reward_amount: 'u64',
            block_reward_last_block: 'u64',
            karma_reward_amount: 'u128',
            karma_reward_alloc: 'u128',
            karma_reward_top_n_users: 'u64',
            char_traits: 'Vec<CharTrait>',
            verifiers: 'Vec<PhoneVerifier>',
        },
        CharTrait: {
            id: 'u32',
            name: 'Text',
            emoji: 'Text',
        },
        PhoneVerifier: {
            account_id: 'AccountId',
            name: 'Text',
        }
    },
    rpc: {
        chain: {
            getBlockInfo: {
                description: 'Provides block information by block number',
                params: [
                    {
                        name: 'block_height',
                        type: 'u32'
                    }
                ],
                type: 'RpcBlock',
            },
            getBlocks: {
                description: 'Provides blocks information by the range of blocks number',
                params: [
                    {
                        name: 'from_block_height',
                        type: 'u32'
                    },
                    {
                        name: 'to_block_height',
                        type: 'u32'
                    }
                ],
                type: 'Vec<RpcBlock>'
            },
            getBlockchainData: {
                description: 'Provides information about current blockchain state',
                params: [],
                type: 'BlockchainStats'
            },
            getGenesisData: {
                description: 'Provides information about blockchain genesis config',
                params: [],
                type: 'GenesisData'
            }
        }
    }
};
