import '@polkadot/api-base/types/storage';
import type { ApiTypes, AugmentedQuery, QueryableStorageEntry } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256, Perbill, Percent } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportDispatchPerDispatchClassWeight, FrameSystemAccountInfo, FrameSystemEventRecord, FrameSystemLastRuntimeUpgradeInfo, FrameSystemPhase, KarmachainNodeRuntimeOpaqueSessionKeys, PalletAppreciationCharTrait, PalletAppreciationCommunity, PalletAppreciationCommunityRole, PalletAuthorshipUncleEntryItem, PalletBagsListListBag, PalletBagsListListNode, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesReserveData, PalletElectionProviderMultiPhasePhase, PalletElectionProviderMultiPhaseReadySolution, PalletElectionProviderMultiPhaseRoundSnapshot, PalletElectionProviderMultiPhaseSignedSignedSubmission, PalletElectionProviderMultiPhaseSolutionOrSnapshotSize, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletIdentityIdentityStore, PalletStakingActiveEraInfo, PalletStakingEraRewardPoints, PalletStakingExposure, PalletStakingForcing, PalletStakingNominations, PalletStakingRewardDestination, PalletStakingSlashingSlashingSpans, PalletStakingSlashingSpanRecord, PalletStakingStakingLedger, PalletStakingUnappliedSlash, PalletStakingValidatorPrefs, PalletTransactionPaymentReleases, SpCommonIdentityAccountIdentity, SpConsensusBabeAppPublic, SpConsensusBabeBabeEpochConfiguration, SpConsensusBabeDigestsNextConfigDescriptor, SpConsensusBabeDigestsPreDigest, SpCoreCryptoKeyTypeId, SpNposElectionsElectionScore, SpRuntimeDigest } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';
export type __AugmentedQuery<ApiType extends ApiTypes> = AugmentedQuery<ApiType, () => unknown>;
export type __QueryableStorageEntry<ApiType extends ApiTypes> = QueryableStorageEntry<ApiType>;
declare module '@polkadot/api-base/types/storage' {
    interface AugmentedQueries<ApiType extends ApiTypes> {
        appreciation: {
            /**
             * User gets one for each referral who signed up
             **/
            ambassadorCharTraitId: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            charTraits: AugmentedQuery<ApiType, () => Observable<Vec<PalletAppreciationCharTrait>>, []>;
            communities: AugmentedQuery<ApiType, () => Observable<Vec<PalletAppreciationCommunity>>, []>;
            communityMembership: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletAppreciationCommunityRole>>, [AccountId32, u32]>;
            noCharTraitId: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            noCommunityId: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            referrals: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: SpCommonIdentityAccountIdentity | {
                AccountId: any;
            } | {
                PhoneNumber: any;
            } | {
                Name: any;
            } | string | Uint8Array) => Observable<Option<Null>>, [AccountId32, SpCommonIdentityAccountIdentity]>;
            /**
             * This is the signup trait - user gets it for signing up
             **/
            signupCharTraitId: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * User gets a point in this trait for each sent appreciation / payment
             **/
            spenderCharTraitId: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            traitScores: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array, arg3: u32 | AnyNumber | Uint8Array) => Observable<Option<u32>>, [AccountId32, u32, u32]>;
        };
        authorship: {
            /**
             * Author of current block.
             **/
            author: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []>;
            /**
             * Whether uncles were already set in this block.
             **/
            didSetUncles: AugmentedQuery<ApiType, () => Observable<bool>, []>;
            /**
             * Uncles
             **/
            uncles: AugmentedQuery<ApiType, () => Observable<Vec<PalletAuthorshipUncleEntryItem>>, []>;
        };
        babe: {
            /**
             * Current epoch authorities.
             **/
            authorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[SpConsensusBabeAppPublic, u64]>>>, []>;
            /**
             * This field should always be populated during block processing unless
             * secondary plain slots are enabled (which don't contain a VRF output).
             *
             * It is set in `on_finalize`, before it will contain the value from the last block.
             **/
            authorVrfRandomness: AugmentedQuery<ApiType, () => Observable<Option<U8aFixed>>, []>;
            /**
             * Current slot number.
             **/
            currentSlot: AugmentedQuery<ApiType, () => Observable<u64>, []>;
            /**
             * The configuration for the current epoch. Should never be `None` as it is initialized in
             * genesis.
             **/
            epochConfig: AugmentedQuery<ApiType, () => Observable<Option<SpConsensusBabeBabeEpochConfiguration>>, []>;
            /**
             * Current epoch index.
             **/
            epochIndex: AugmentedQuery<ApiType, () => Observable<u64>, []>;
            /**
             * The block numbers when the last and current epoch have started, respectively `N-1` and
             * `N`.
             * NOTE: We track this is in order to annotate the block number when a given pool of
             * entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
             * slots, which may be skipped, the block numbers may not line up with the slot numbers.
             **/
            epochStart: AugmentedQuery<ApiType, () => Observable<ITuple<[u32, u32]>>, []>;
            /**
             * The slot at which the first epoch actually started. This is 0
             * until the first block of the chain.
             **/
            genesisSlot: AugmentedQuery<ApiType, () => Observable<u64>, []>;
            /**
             * Temporary value (cleared at block finalization) which is `Some`
             * if per-block initialization has already been called for current block.
             **/
            initialized: AugmentedQuery<ApiType, () => Observable<Option<Option<SpConsensusBabeDigestsPreDigest>>>, []>;
            /**
             * How late the current block is compared to its parent.
             *
             * This entry is populated as part of block execution and is cleaned up
             * on block finalization. Querying this storage entry outside of block
             * execution context should always yield zero.
             **/
            lateness: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Next epoch authorities.
             **/
            nextAuthorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[SpConsensusBabeAppPublic, u64]>>>, []>;
            /**
             * The configuration for the next epoch, `None` if the config will not change
             * (you can fallback to `EpochConfig` instead in that case).
             **/
            nextEpochConfig: AugmentedQuery<ApiType, () => Observable<Option<SpConsensusBabeBabeEpochConfiguration>>, []>;
            /**
             * Next epoch randomness.
             **/
            nextRandomness: AugmentedQuery<ApiType, () => Observable<U8aFixed>, []>;
            /**
             * Pending epoch configuration change that will be applied when the next epoch is enacted.
             **/
            pendingEpochConfigChange: AugmentedQuery<ApiType, () => Observable<Option<SpConsensusBabeDigestsNextConfigDescriptor>>, []>;
            /**
             * The epoch randomness for the *current* epoch.
             *
             * # Security
             *
             * This MUST NOT be used for gambling, as it can be influenced by a
             * malicious validator in the short term. It MAY be used in many
             * cryptographic protocols, however, so long as one remembers that this
             * (like everything else on-chain) it is public. For example, it can be
             * used where a number is needed that cannot have been chosen by an
             * adversary, for purposes such as public-coin zero-knowledge proofs.
             **/
            randomness: AugmentedQuery<ApiType, () => Observable<U8aFixed>, []>;
            /**
             * Randomness under construction.
             *
             * We make a trade-off between storage accesses and list length.
             * We store the under-construction randomness in segments of up to
             * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
             *
             * Once a segment reaches this length, we begin the next one.
             * We reset all segments and return to `0` at the beginning of every
             * epoch.
             **/
            segmentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
             **/
            underConstruction: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<U8aFixed>>, [u32]>;
        };
        balances: {
            /**
             * The Balances pallet example of storing the balance of an account.
             *
             * # Example
             *
             * ```nocompile
             * impl pallet_balances::Config for Runtime {
             * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
             * }
             * ```
             *
             * You can also store the balance of an account in the `System` pallet.
             *
             * # Example
             *
             * ```nocompile
             * impl pallet_balances::Config for Runtime {
             * type AccountStore = System
             * }
             * ```
             *
             * But this comes with tradeoffs, storing account balances in the system pallet stores
             * `frame_system` data alongside the account data contrary to storing account balances in the
             * `Balances` pallet, which uses a `StorageMap` to store balances data only.
             * NOTE: This is only used in the case that this pallet is used to store balances.
             **/
            account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>, [AccountId32]>;
            /**
             * The total units of outstanding deactivated balance in the system.
             **/
            inactiveIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            /**
             * Any liquidity locks on some account balances.
             * NOTE: Should only be accessed when setting, changing and freeing a lock.
             **/
            locks: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>, [AccountId32]>;
            /**
             * Named reserves on some account balances.
             **/
            reserves: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>, [AccountId32]>;
            /**
             * The total units issued in the system.
             **/
            totalIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []>;
        };
        electionProviderMultiPhase: {
            /**
             * Current phase.
             **/
            currentPhase: AugmentedQuery<ApiType, () => Observable<PalletElectionProviderMultiPhasePhase>, []>;
            /**
             * Desired number of targets to elect for this round.
             *
             * Only exists when [`Snapshot`] is present.
             **/
            desiredTargets: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * The minimum score that each 'untrusted' solution must attain in order to be considered
             * feasible.
             *
             * Can be set via `set_minimum_untrusted_score`.
             **/
            minimumUntrustedScore: AugmentedQuery<ApiType, () => Observable<Option<SpNposElectionsElectionScore>>, []>;
            /**
             * Current best solution, signed or unsigned, queued to be returned upon `elect`.
             **/
            queuedSolution: AugmentedQuery<ApiType, () => Observable<Option<PalletElectionProviderMultiPhaseReadySolution>>, []>;
            /**
             * Internal counter for the number of rounds.
             *
             * This is useful for de-duplication of transactions submitted to the pool, and general
             * diagnostics of the pallet.
             *
             * This is merely incremented once per every time that an upstream `elect` is called.
             **/
            round: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * A sorted, bounded vector of `(score, block_number, index)`, where each `index` points to a
             * value in `SignedSubmissions`.
             *
             * We never need to process more than a single signed submission at a time. Signed submissions
             * can be quite large, so we're willing to pay the cost of multiple database accesses to access
             * them one at a time instead of reading and decoding all of them at once.
             **/
            signedSubmissionIndices: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[SpNposElectionsElectionScore, u32, u32]>>>, []>;
            /**
             * The next index to be assigned to an incoming signed submission.
             *
             * Every accepted submission is assigned a unique index; that index is bound to that particular
             * submission for the duration of the election. On election finalization, the next index is
             * reset to 0.
             *
             * We can't just use `SignedSubmissionIndices.len()`, because that's a bounded set; past its
             * capacity, it will simply saturate. We can't just iterate over `SignedSubmissionsMap`,
             * because iteration is slow. Instead, we store the value here.
             **/
            signedSubmissionNextIndex: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Unchecked, signed solutions.
             *
             * Together with `SubmissionIndices`, this stores a bounded set of `SignedSubmissions` while
             * allowing us to keep only a single one in memory at a time.
             *
             * Twox note: the key of the map is an auto-incrementing index which users cannot inspect or
             * affect; we shouldn't need a cryptographically secure hasher.
             **/
            signedSubmissionsMap: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletElectionProviderMultiPhaseSignedSignedSubmission>>, [u32]>;
            /**
             * Snapshot data of the round.
             *
             * This is created at the beginning of the signed phase and cleared upon calling `elect`.
             **/
            snapshot: AugmentedQuery<ApiType, () => Observable<Option<PalletElectionProviderMultiPhaseRoundSnapshot>>, []>;
            /**
             * The metadata of the [`RoundSnapshot`]
             *
             * Only exists when [`Snapshot`] is present.
             **/
            snapshotMetadata: AugmentedQuery<ApiType, () => Observable<Option<PalletElectionProviderMultiPhaseSolutionOrSnapshotSize>>, []>;
        };
        grandpa: {
            /**
             * The number of changes (both in terms of keys and underlying economic responsibilities)
             * in the "set" of Grandpa validators from genesis.
             **/
            currentSetId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
            /**
             * next block number where we can force a change.
             **/
            nextForced: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * Pending change: (signaled at, scheduled change).
             **/
            pendingChange: AugmentedQuery<ApiType, () => Observable<Option<PalletGrandpaStoredPendingChange>>, []>;
            /**
             * A mapping from grandpa set ID to the index of the *most recent* session for which its
             * members were responsible.
             *
             * TWOX-NOTE: `SetId` is not under user control.
             **/
            setIdSession: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<u32>>, [u64]>;
            /**
             * `true` if we are currently stalled.
             **/
            stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u32, u32]>>>, []>;
            /**
             * State of the current authority set.
             **/
            state: AugmentedQuery<ApiType, () => Observable<PalletGrandpaStoredState>, []>;
        };
        historical: {
            /**
             * Mapping from historical session indices to session-data root hash and validator count.
             **/
            historicalSessions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<ITuple<[H256, u32]>>>, [u32]>;
            /**
             * The range of historical sessions we store. [first, last)
             **/
            storedRange: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u32, u32]>>>, []>;
        };
        identity: {
            identityOf: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletIdentityIdentityStore>>, [AccountId32]>;
            nameFor: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<AccountId32>>, [Bytes]>;
            phoneNumberFor: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<AccountId32>>, [Bytes]>;
            phoneVerifiers: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []>;
        };
        session: {
            /**
             * Current index of the session.
             **/
            currentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Indices of disabled validators.
             *
             * The vec is always kept sorted so that we can find whether a given validator is
             * disabled using binary search. It gets cleared when `on_session_ending` returns
             * a new set of identities.
             **/
            disabledValidators: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []>;
            /**
             * The owner of a key. The key is the `KeyTypeId` + the encoded key.
             **/
            keyOwner: AugmentedQuery<ApiType, (arg: ITuple<[SpCoreCryptoKeyTypeId, Bytes]> | [SpCoreCryptoKeyTypeId | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<AccountId32>>, [ITuple<[SpCoreCryptoKeyTypeId, Bytes]>]>;
            /**
             * The next session keys for a validator.
             **/
            nextKeys: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<KarmachainNodeRuntimeOpaqueSessionKeys>>, [AccountId32]>;
            /**
             * True if the underlying economic identities or weighting behind the validators
             * has changed in the queued validator set.
             **/
            queuedChanged: AugmentedQuery<ApiType, () => Observable<bool>, []>;
            /**
             * The queued keys for the next session. When the next session begins, these keys
             * will be used to determine the validator's session keys.
             **/
            queuedKeys: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AccountId32, KarmachainNodeRuntimeOpaqueSessionKeys]>>>, []>;
            /**
             * The current set of validators.
             **/
            validators: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []>;
        };
        staking: {
            /**
             * The active era information, it holds index and start.
             *
             * The active era is the era being currently rewarded. Validator set of this era must be
             * equal to [`SessionInterface::validators`].
             **/
            activeEra: AugmentedQuery<ApiType, () => Observable<Option<PalletStakingActiveEraInfo>>, []>;
            /**
             * Map from all locked "stash" accounts to the controller account.
             *
             * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
             **/
            bonded: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<AccountId32>>, [AccountId32]>;
            /**
             * A mapping from still-bonded eras to the first session index of that era.
             *
             * Must contains information for eras for the range:
             * `[active_era - bounding_duration; active_era]`
             **/
            bondedEras: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[u32, u32]>>>, []>;
            /**
             * The amount of currency given to reporters of a slash event which was
             * canceled by extraordinary circumstances (e.g. governance).
             **/
            canceledSlashPayout: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            /**
             * The threshold for when users can start calling `chill_other` for other validators /
             * nominators. The threshold is compared to the actual number of validators / nominators
             * (`CountFor*`) in the system compared to the configured max (`Max*Count`).
             **/
            chillThreshold: AugmentedQuery<ApiType, () => Observable<Option<Percent>>, []>;
            /**
             * Counter for the related counted storage map
             **/
            counterForNominators: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Counter for the related counted storage map
             **/
            counterForValidators: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * The current era index.
             *
             * This is the latest planned era, depending on how the Session pallet queues the validator
             * set, it might be active or not.
             **/
            currentEra: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * The last planned session scheduled by the session pallet.
             *
             * This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
             **/
            currentPlannedSession: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Rewards for the last `HISTORY_DEPTH` eras.
             * If reward hasn't been set or has been removed then 0 reward is returned.
             **/
            erasRewardPoints: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<PalletStakingEraRewardPoints>, [u32]>;
            /**
             * Exposure of validator at era.
             *
             * This is keyed first by the era index to allow bulk deletion and then the stash account.
             *
             * Is it removed after `HISTORY_DEPTH` eras.
             * If stakers hasn't been set or has been removed then empty exposure is returned.
             **/
            erasStakers: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<PalletStakingExposure>, [u32, AccountId32]>;
            /**
             * Clipped Exposure of validator at era.
             *
             * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
             * `T::MaxNominatorRewardedPerValidator` biggest stakers.
             * (Note: the field `total` and `own` of the exposure remains unchanged).
             * This is used to limit the i/o cost for the nominator payout.
             *
             * This is keyed fist by the era index to allow bulk deletion and then the stash account.
             *
             * Is it removed after `HISTORY_DEPTH` eras.
             * If stakers hasn't been set or has been removed then empty exposure is returned.
             **/
            erasStakersClipped: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<PalletStakingExposure>, [u32, AccountId32]>;
            /**
             * The session index at which the era start for the last `HISTORY_DEPTH` eras.
             *
             * Note: This tracks the starting session (i.e. session index when era start being active)
             * for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
             **/
            erasStartSessionIndex: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<u32>>, [u32]>;
            /**
             * The total amount staked for the last `HISTORY_DEPTH` eras.
             * If total hasn't been set or has been removed then 0 stake is returned.
             **/
            erasTotalStake: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u128>, [u32]>;
            /**
             * Similar to `ErasStakers`, this holds the preferences of validators.
             *
             * This is keyed first by the era index to allow bulk deletion and then the stash account.
             *
             * Is it removed after `HISTORY_DEPTH` eras.
             **/
            erasValidatorPrefs: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<PalletStakingValidatorPrefs>, [u32, AccountId32]>;
            /**
             * The total validator era payout for the last `HISTORY_DEPTH` eras.
             *
             * Eras that haven't finished yet or has been removed doesn't have reward.
             **/
            erasValidatorReward: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<u128>>, [u32]>;
            /**
             * Mode of era forcing.
             **/
            forceEra: AugmentedQuery<ApiType, () => Observable<PalletStakingForcing>, []>;
            /**
             * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
             * easy to initialize and the performance hit is minimal (we expect no more than four
             * invulnerables) and restricted to testnets.
             **/
            invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []>;
            /**
             * Map from all (unlocked) "controller" accounts to the info regarding the staking.
             **/
            ledger: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletStakingStakingLedger>>, [AccountId32]>;
            /**
             * The maximum nominator count before we stop allowing new validators to join.
             *
             * When this value is not set, no limits are enforced.
             **/
            maxNominatorsCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * The maximum validator count before we stop allowing new validators to join.
             *
             * When this value is not set, no limits are enforced.
             **/
            maxValidatorsCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * The minimum amount of commission that validators can set.
             *
             * If set to `0`, no limit exists.
             **/
            minCommission: AugmentedQuery<ApiType, () => Observable<Perbill>, []>;
            /**
             * The minimum active nominator stake of the last successful election.
             **/
            minimumActiveStake: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            /**
             * Minimum number of staking participants before emergency conditions are imposed.
             **/
            minimumValidatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * The minimum active bond to become and maintain the role of a nominator.
             **/
            minNominatorBond: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            /**
             * The minimum active bond to become and maintain the role of a validator.
             **/
            minValidatorBond: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            /**
             * The map from nominator stash key to their nomination preferences, namely the validators that
             * they wish to support.
             *
             * Note that the keys of this storage map might become non-decodable in case the
             * [`Config::MaxNominations`] configuration is decreased. In this rare case, these nominators
             * are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
             * indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
             * nominators will effectively not-exist, until they re-submit their preferences such that it
             * is within the bounds of the newly set `Config::MaxNominations`.
             *
             * This implies that `::iter_keys().count()` and `::iter().count()` might return different
             * values for this map. Moreover, the main `::count()` is aligned with the former, namely the
             * number of keys that exist.
             *
             * Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
             * [`Call::chill_other`] dispatchable by anyone.
             *
             * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
             **/
            nominators: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletStakingNominations>>, [AccountId32]>;
            /**
             * All slashing events on nominators, mapped by era to the highest slash value of the era.
             **/
            nominatorSlashInEra: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Option<u128>>, [u32, AccountId32]>;
            /**
             * Indices of validators that have offended in the active era and whether they are currently
             * disabled.
             *
             * This value should be a superset of disabled validators since not all offences lead to the
             * validator being disabled (if there was no slash). This is needed to track the percentage of
             * validators that have offended in the current era, ensuring a new era is forced if
             * `OffendingValidatorsThreshold` is reached. The vec is always kept sorted so that we can find
             * whether a given validator has previously offended using binary search. It gets cleared when
             * the era ends.
             **/
            offendingValidators: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[u32, bool]>>>, []>;
            /**
             * Where the reward payment should be made. Keyed by stash.
             *
             * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
             **/
            payee: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletStakingRewardDestination>, [AccountId32]>;
            /**
             * Slashing spans for stash accounts.
             **/
            slashingSpans: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletStakingSlashingSlashingSpans>>, [AccountId32]>;
            /**
             * The percentage of the slash that is distributed to reporters.
             *
             * The rest of the slashed value is handled by the `Slash`.
             **/
            slashRewardFraction: AugmentedQuery<ApiType, () => Observable<Perbill>, []>;
            /**
             * Records information about the maximum slash of a stash within a slashing span,
             * as well as how much reward has been paid out.
             **/
            spanSlash: AugmentedQuery<ApiType, (arg: ITuple<[AccountId32, u32]> | [AccountId32 | string | Uint8Array, u32 | AnyNumber | Uint8Array]) => Observable<PalletStakingSlashingSpanRecord>, [ITuple<[AccountId32, u32]>]>;
            /**
             * All unapplied slashes that are queued for later.
             **/
            unappliedSlashes: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<PalletStakingUnappliedSlash>>, [u32]>;
            /**
             * The ideal number of active validators.
             **/
            validatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * The map from (wannabe) validator stash key to the preferences of that validator.
             *
             * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
             **/
            validators: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletStakingValidatorPrefs>, [AccountId32]>;
            /**
             * All slashing events on validators, mapped by era to the highest slash proportion
             * and slash value of the era.
             **/
            validatorSlashInEra: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Option<ITuple<[Perbill, u128]>>>, [u32, AccountId32]>;
        };
        sudo: {
            /**
             * The `AccountId` of the sudo key.
             **/
            key: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []>;
        };
        system: {
            /**
             * The full account information for a particular account ID.
             **/
            account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>, [AccountId32]>;
            /**
             * Total length (in bytes) for all extrinsics put together, for the current block.
             **/
            allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * Map of block numbers to block hashes.
             **/
            blockHash: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<H256>, [u32]>;
            /**
             * The current weight for the block.
             **/
            blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportDispatchPerDispatchClassWeight>, []>;
            /**
             * Digest of the current block, also part of the block header.
             **/
            digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []>;
            /**
             * The number of events in the `Events<T>` list.
             **/
            eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Events deposited for the current block.
             *
             * NOTE: The item is unbound and should therefore never be read on chain.
             * It could otherwise inflate the PoV size of a block.
             *
             * Events have a large in-memory size. Box the events to not go out-of-memory
             * just in case someone still reads them from within the runtime.
             **/
            events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []>;
            /**
             * Mapping between a topic (represented by T::Hash) and a vector of indexes
             * of events in the `<Events<T>>` list.
             *
             * All topic vectors have deterministic storage locations depending on the topic. This
             * allows light-clients to leverage the changes trie storage tracking mechanism and
             * in case of changes fetch the list of events of interest.
             *
             * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
             * the `EventIndex` then in case if the topic has the same contents on the next block
             * no notification will be triggered thus the event might be lost.
             **/
            eventTopics: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u32, u32]>>>, [H256]>;
            /**
             * The execution phase of the block.
             **/
            executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []>;
            /**
             * Total extrinsics count for the current block.
             **/
            extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
            /**
             * Extrinsics data for the current block (maps an extrinsic's index to its data).
             **/
            extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]>;
            /**
             * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
             **/
            lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>, []>;
            /**
             * The current block number being processed. Set by `execute_block`.
             **/
            number: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * Hash of the previous block.
             **/
            parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []>;
            /**
             * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
             * (default) if not.
             **/
            upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []>;
            /**
             * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
             **/
            upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []>;
        };
        timestamp: {
            /**
             * Did the timestamp get updated in this block?
             **/
            didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []>;
            /**
             * Current time for the current block.
             **/
            now: AugmentedQuery<ApiType, () => Observable<u64>, []>;
        };
        transactionIndexer: {
            accountTransactions: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<Vec<ITuple<[u32, u32]>>>>, [AccountId32]>;
            txHashes: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ITuple<[u32, u32]>>>, [H256]>;
        };
        transactionPayment: {
            nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []>;
            storageVersion: AugmentedQuery<ApiType, () => Observable<PalletTransactionPaymentReleases>, []>;
        };
        voterList: {
            /**
             * Counter for the related counted storage map
             **/
            counterForListNodes: AugmentedQuery<ApiType, () => Observable<u32>, []>;
            /**
             * A bag stored in storage.
             *
             * Stores a `Bag` struct, which stores head and tail pointers to itself.
             **/
            listBags: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletBagsListListBag>>, [u64]>;
            /**
             * A single node, within some bag.
             *
             * Nodes store links forward and back within their respective bags.
             **/
            listNodes: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletBagsListListNode>>, [AccountId32]>;
        };
    }
}
