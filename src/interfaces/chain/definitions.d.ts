declare const _default: {
    types: {
        RpcBlock: {
            time: string;
            author: string;
            height: string;
            transaction_hashes: string;
            fees: string;
            signature: string;
            digest: string;
        };
        BlockchainStats: {
            last_block_time: string;
            tip_height: string;
            transaction_count: string;
            payment_transaction_count: string;
            appreciations_transactions_count: string;
            update_user_transactions_count: string;
            users_count: string;
            fees_amount: string;
            minted_amount: string;
            circulation: string;
            fee_subs_count: string;
            fee_subs_amount: string;
            signup_rewards_count: string;
            signup_rewards_amount: string;
            referral_rewards_count: string;
            referral_rewards_amount: string;
            validator_rewards_count: string;
            validator_rewards_amount: string;
            causes_rewards_amount: string;
        };
        GenesisData: {
            net_id: string;
            net_name: string;
            genesis_time: string;
            signup_reward_phase1_alloc: string;
            signup_reward_phase2_alloc: string;
            signup_reward_phase1_amount: string;
            signup_reward_phase2_amount: string;
            signup_reward_phase3_start: string;
            referral_reward_phase1_alloc: string;
            referral_reward_phase2_alloc: string;
            referral_reward_phase1_amount: string;
            referral_reward_phase2_amount: string;
            tx_fee_subsidy_max_per_user: string;
            tx_fee_subsidies_alloc: string;
            tx_fee_subsidy_max_amount: string;
            block_reward_amount: string;
            block_reward_last_block: string;
            karma_reward_amount: string;
            karma_reward_alloc: string;
            karma_reward_top_n_users: string;
            char_traits: string;
            verifiers: string;
        };
        CharTrait: {
            id: string;
            name: string;
            emoji: string;
        };
        PhoneVerifier: {
            account_id: string;
            name: string;
        };
    };
    rpc: {
        chain: {
            getBlockInfo: {
                description: string;
                params: {
                    name: string;
                    type: string;
                }[];
                type: string;
            };
            getBlocks: {
                description: string;
                params: {
                    name: string;
                    type: string;
                }[];
                type: string;
            };
            getBlockchainData: {
                description: string;
                type: string;
            };
            getGenesisData: {
                description: string;
                type: string;
            };
        };
    };
};
export default _default;
