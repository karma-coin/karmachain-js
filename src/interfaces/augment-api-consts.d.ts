import '@polkadot/api-base/types/consts';
import type { ApiTypes, AugmentedConst } from '@polkadot/api-base/types';
import type { Vec, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { Perbill } from '@polkadot/types/interfaces/runtime';
import type { FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SpWeightsWeightV2Weight } from '@polkadot/types/lookup';
export type __AugmentedConst<ApiType extends ApiTypes> = AugmentedConst<ApiType>;
declare module '@polkadot/api-base/types/consts' {
    interface AugmentedConsts<ApiType extends ApiTypes> {
        authorship: {
            /**
             * The number of blocks back we should accept uncles.
             * This means that we will deal with uncle-parents that are
             * `UncleGenerations + 1` before `now`.
             **/
            uncleGenerations: u32 & AugmentedConst<ApiType>;
        };
        babe: {
            /**
             * The amount of time, in slots, that each epoch should last.
             * NOTE: Currently it is not possible to change the epoch duration after
             * the chain has started. Attempting to do so will brick block production.
             **/
            epochDuration: u64 & AugmentedConst<ApiType>;
            /**
             * The expected average block time at which BABE should be creating
             * blocks. Since BABE is probabilistic it is not trivial to figure out
             * what the expected average block time should be based on the slot
             * duration and the security parameter `c` (where `1 - c` represents
             * the probability of a slot being empty).
             **/
            expectedBlockTime: u64 & AugmentedConst<ApiType>;
            /**
             * Max number of authorities allowed
             **/
            maxAuthorities: u32 & AugmentedConst<ApiType>;
        };
        balances: {
            /**
             * The minimum amount required to keep an account open.
             **/
            existentialDeposit: u128 & AugmentedConst<ApiType>;
            /**
             * The maximum number of locks that should exist on an account.
             * Not strictly enforced, but used for weight estimation.
             **/
            maxLocks: u32 & AugmentedConst<ApiType>;
            /**
             * The maximum number of named reserves that can exist on an account.
             **/
            maxReserves: u32 & AugmentedConst<ApiType>;
        };
        electionProviderMultiPhase: {
            /**
             * The minimum amount of improvement to the solution score that defines a solution as
             * "better" in the Signed phase.
             **/
            betterSignedThreshold: Perbill & AugmentedConst<ApiType>;
            /**
             * The minimum amount of improvement to the solution score that defines a solution as
             * "better" in the Unsigned phase.
             **/
            betterUnsignedThreshold: Perbill & AugmentedConst<ApiType>;
            /**
             * The maximum number of electable targets to put in the snapshot.
             **/
            maxElectableTargets: u16 & AugmentedConst<ApiType>;
            /**
             * The maximum number of electing voters to put in the snapshot. At the moment, snapshots
             * are only over a single block, but once multi-block elections are introduced they will
             * take place over multiple blocks.
             **/
            maxElectingVoters: u32 & AugmentedConst<ApiType>;
            /**
             * The maximum number of winners that can be elected by this `ElectionProvider`
             * implementation.
             *
             * Note: This must always be greater or equal to `T::DataProvider::desired_targets()`.
             **/
            maxWinners: u32 & AugmentedConst<ApiType>;
            minerMaxLength: u32 & AugmentedConst<ApiType>;
            minerMaxVotesPerVoter: u32 & AugmentedConst<ApiType>;
            minerMaxWeight: SpWeightsWeightV2Weight & AugmentedConst<ApiType>;
            /**
             * The priority of the unsigned transaction submitted in the unsigned-phase
             **/
            minerTxPriority: u64 & AugmentedConst<ApiType>;
            /**
             * The repeat threshold of the offchain worker.
             *
             * For example, if it is 5, that means that at least 5 blocks will elapse between attempts
             * to submit the worker's solution.
             **/
            offchainRepeat: u32 & AugmentedConst<ApiType>;
            /**
             * Base deposit for a signed solution.
             **/
            signedDepositBase: u128 & AugmentedConst<ApiType>;
            /**
             * Per-byte deposit for a signed solution.
             **/
            signedDepositByte: u128 & AugmentedConst<ApiType>;
            /**
             * Per-weight deposit for a signed solution.
             **/
            signedDepositWeight: u128 & AugmentedConst<ApiType>;
            /**
             * The maximum amount of unchecked solutions to refund the call fee for.
             **/
            signedMaxRefunds: u32 & AugmentedConst<ApiType>;
            /**
             * Maximum number of signed submissions that can be queued.
             *
             * It is best to avoid adjusting this during an election, as it impacts downstream data
             * structures. In particular, `SignedSubmissionIndices<T>` is bounded on this value. If you
             * update this value during an election, you _must_ ensure that
             * `SignedSubmissionIndices.len()` is less than or equal to the new value. Otherwise,
             * attempts to submit new solutions may cause a runtime panic.
             **/
            signedMaxSubmissions: u32 & AugmentedConst<ApiType>;
            /**
             * Maximum weight of a signed solution.
             *
             * If [`Config::MinerConfig`] is being implemented to submit signed solutions (outside of
             * this pallet), then [`MinerConfig::solution_weight`] is used to compare against
             * this value.
             **/
            signedMaxWeight: SpWeightsWeightV2Weight & AugmentedConst<ApiType>;
            /**
             * Duration of the signed phase.
             **/
            signedPhase: u32 & AugmentedConst<ApiType>;
            /**
             * Base reward for a signed solution
             **/
            signedRewardBase: u128 & AugmentedConst<ApiType>;
            /**
             * Duration of the unsigned phase.
             **/
            unsignedPhase: u32 & AugmentedConst<ApiType>;
        };
        grandpa: {
            /**
             * Max Authorities in use
             **/
            maxAuthorities: u32 & AugmentedConst<ApiType>;
        };
        staking: {
            /**
             * Number of eras that staked funds must remain bonded for.
             **/
            bondingDuration: u32 & AugmentedConst<ApiType>;
            /**
             * Number of eras to keep in history.
             *
             * Following information is kept for eras in `[current_era -
             * HistoryDepth, current_era]`: `ErasStakers`, `ErasStakersClipped`,
             * `ErasValidatorPrefs`, `ErasValidatorReward`, `ErasRewardPoints`,
             * `ErasTotalStake`, `ErasStartSessionIndex`,
             * `StakingLedger.claimed_rewards`.
             *
             * Must be more than the number of eras delayed by session.
             * I.e. active era must always be in history. I.e. `active_era >
             * current_era - history_depth` must be guaranteed.
             *
             * If migrating an existing pallet from storage value to config value,
             * this should be set to same value or greater as in storage.
             *
             * Note: `HistoryDepth` is used as the upper bound for the `BoundedVec`
             * item `StakingLedger.claimed_rewards`. Setting this value lower than
             * the existing value can lead to inconsistencies in the
             * `StakingLedger` and will need to be handled properly in a migration.
             * The test `reducing_history_depth_abrupt` shows this effect.
             **/
            historyDepth: u32 & AugmentedConst<ApiType>;
            /**
             * Maximum number of nominations per nominator.
             **/
            maxNominations: u32 & AugmentedConst<ApiType>;
            /**
             * The maximum number of nominators rewarded for each validator.
             *
             * For each validator only the `$MaxNominatorRewardedPerValidator` biggest stakers can
             * claim their reward. This used to limit the i/o cost for the nominator payout.
             **/
            maxNominatorRewardedPerValidator: u32 & AugmentedConst<ApiType>;
            /**
             * The maximum number of `unlocking` chunks a [`StakingLedger`] can
             * have. Effectively determines how many unique eras a staker may be
             * unbonding in.
             *
             * Note: `MaxUnlockingChunks` is used as the upper bound for the
             * `BoundedVec` item `StakingLedger.unlocking`. Setting this value
             * lower than the existing value can lead to inconsistencies in the
             * `StakingLedger` and will need to be handled properly in a runtime
             * migration. The test `reducing_max_unlocking_chunks_abrupt` shows
             * this effect.
             **/
            maxUnlockingChunks: u32 & AugmentedConst<ApiType>;
            /**
             * Number of sessions per era.
             **/
            sessionsPerEra: u32 & AugmentedConst<ApiType>;
            /**
             * Number of eras that slashes are deferred by, after computation.
             *
             * This should be less than the bonding duration. Set to 0 if slashes
             * should be applied immediately, without opportunity for intervention.
             **/
            slashDeferDuration: u32 & AugmentedConst<ApiType>;
        };
        system: {
            /**
             * Maximum number of block number to block hash mappings to keep (oldest pruned first).
             **/
            blockHashCount: u32 & AugmentedConst<ApiType>;
            /**
             * The maximum length of a block (in bytes).
             **/
            blockLength: FrameSystemLimitsBlockLength & AugmentedConst<ApiType>;
            /**
             * Block & extrinsics weights: base values and limits.
             **/
            blockWeights: FrameSystemLimitsBlockWeights & AugmentedConst<ApiType>;
            /**
             * The weight of runtime database operations the runtime can invoke.
             **/
            dbWeight: SpWeightsRuntimeDbWeight & AugmentedConst<ApiType>;
            /**
             * The designated SS58 prefix of this chain.
             *
             * This replaces the "ss58Format" property declared in the chain spec. Reason is
             * that the runtime should know about the prefix in order to make use of it as
             * an identifier of the chain.
             **/
            ss58Prefix: u16 & AugmentedConst<ApiType>;
            /**
             * Get the chain's current version.
             **/
            version: SpVersionRuntimeVersion & AugmentedConst<ApiType>;
        };
        timestamp: {
            /**
             * The minimum period between blocks. Beware that this is different to the *expected*
             * period that the block production apparatus provides. Your chosen consensus system will
             * generally work with this to determine a sensible block time. e.g. For Aura, it will be
             * double this period on default settings.
             **/
            minimumPeriod: u64 & AugmentedConst<ApiType>;
        };
        transactionPayment: {
            /**
             * A fee mulitplier for `Operational` extrinsics to compute "virtual tip" to boost their
             * `priority`
             *
             * This value is multipled by the `final_fee` to obtain a "virtual tip" that is later
             * added to a tip component in regular `priority` calculations.
             * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
             * extrinsic (with no tip), by including a tip value greater than the virtual tip.
             *
             * ```rust,ignore
             * // For `Normal`
             * let priority = priority_calc(tip);
             *
             * // For `Operational`
             * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
             * let priority = priority_calc(tip + virtual_tip);
             * ```
             *
             * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
             * sent with the transaction. So, not only does the transaction get a priority bump based
             * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
             * transactions.
             **/
            operationalFeeMultiplier: u8 & AugmentedConst<ApiType>;
        };
        voterList: {
            /**
             * The list of thresholds separating the various bags.
             *
             * Ids are separated into unsorted bags according to their score. This specifies the
             * thresholds separating the bags. An id's bag is the largest bag for which the id's score
             * is less than or equal to its upper threshold.
             *
             * When ids are iterated, higher bags are iterated completely before lower bags. This means
             * that iteration is _semi-sorted_: ids of higher score tend to come before ids of lower
             * score, but peer ids within a particular bag are sorted in insertion order.
             *
             * # Expressing the constant
             *
             * This constant must be sorted in strictly increasing order. Duplicate items are not
             * permitted.
             *
             * There is an implied upper limit of `Score::MAX`; that value does not need to be
             * specified within the bag. For any two threshold lists, if one ends with
             * `Score::MAX`, the other one does not, and they are otherwise equal, the two
             * lists will behave identically.
             *
             * # Calculation
             *
             * It is recommended to generate the set of thresholds in a geometric series, such that
             * there exists some constant ratio such that `threshold[k + 1] == (threshold[k] *
             * constant_ratio).max(threshold[k] + 1)` for all `k`.
             *
             * The helpers in the `/utils/frame/generate-bags` module can simplify this calculation.
             *
             * # Examples
             *
             * - If `BagThresholds::get().is_empty()`, then all ids are put into the same bag, and
             * iteration is strictly in insertion order.
             * - If `BagThresholds::get().len() == 64`, and the thresholds are determined according to
             * the procedure given above, then the constant ratio is equal to 2.
             * - If `BagThresholds::get().len() == 200`, and the thresholds are determined according to
             * the procedure given above, then the constant ratio is approximately equal to 1.248.
             * - If the threshold list begins `[1, 2, 3, ...]`, then an id with score 0 or 1 will fall
             * into bag 0, an id with score 2 will fall into bag 1, etc.
             *
             * # Migration
             *
             * In the event that this list ever changes, a copy of the old bags list must be retained.
             * With that `List::migrate` can be called, which will perform the appropriate migration.
             **/
            bagThresholds: Vec<u64> & AugmentedConst<ApiType>;
        };
    }
}
