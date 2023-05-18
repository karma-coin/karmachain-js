import "@polkadot/types/lookup";
import type {
  BTreeMap,
  Bytes,
  Compact,
  Enum,
  Null,
  Option,
  Result,
  Struct,
  Text,
  U8aFixed,
  Vec,
  bool,
  u128,
  u16,
  u32,
  u64,
  u8,
} from "@polkadot/types-codec";
import type { ITuple } from "@polkadot/types-codec/types";
import type {
  AccountId32,
  Call,
  H256,
  MultiAddress,
  PerU16,
  Perbill,
  Percent,
} from "@polkadot/types/interfaces/runtime";
import type { Event } from "@polkadot/types/interfaces/system";
declare module "@polkadot/types/lookup" {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }
  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }
  /** @name FrameSupportDispatchPerDispatchClassWeight (7) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }
  /** @name SpWeightsWeightV2Weight (8) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }
  /** @name SpRuntimeDigest (13) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }
  /** @name SpRuntimeDigestDigestItem (15) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type:
      | "Other"
      | "Consensus"
      | "Seal"
      | "PreRuntime"
      | "RuntimeEnvironmentUpdated";
  }
  /** @name FrameSystemEventRecord (18) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }
  /** @name FrameSystemEvent (20) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type:
      | "ExtrinsicSuccess"
      | "ExtrinsicFailed"
      | "CodeUpdated"
      | "NewAccount"
      | "KilledAccount"
      | "Remarked";
  }
  /** @name FrameSupportDispatchDispatchInfo (21) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }
  /** @name FrameSupportDispatchDispatchClass (22) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: "Normal" | "Operational" | "Mandatory";
  }
  /** @name FrameSupportDispatchPays (23) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: "Yes" | "No";
  }
  /** @name SpRuntimeDispatchError (24) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly type:
      | "Other"
      | "CannotLookup"
      | "BadOrigin"
      | "Module"
      | "ConsumerRemaining"
      | "NoProviders"
      | "TooManyConsumers"
      | "Token"
      | "Arithmetic"
      | "Transactional"
      | "Exhausted"
      | "Corruption"
      | "Unavailable";
  }
  /** @name SpRuntimeModuleError (25) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }
  /** @name SpRuntimeTokenError (26) */
  interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type:
      | "NoFunds"
      | "WouldDie"
      | "BelowMinimum"
      | "CannotCreate"
      | "UnknownAsset"
      | "Frozen"
      | "Unsupported";
  }
  /** @name SpArithmeticArithmeticError (27) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: "Underflow" | "Overflow" | "DivisionByZero";
  }
  /** @name SpRuntimeTransactionalError (28) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: "LimitReached" | "NoLayer";
  }
  /** @name PalletBalancesEvent (29) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type:
      | "Endowed"
      | "DustLost"
      | "Transfer"
      | "BalanceSet"
      | "Reserved"
      | "Unreserved"
      | "ReserveRepatriated"
      | "Deposit"
      | "Withdraw"
      | "Slashed";
  }
  /** @name FrameSupportTokensMiscBalanceStatus (30) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: "Free" | "Reserved";
  }
  /** @name PalletTransactionPaymentEvent (31) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: "TransactionFeePaid";
  }
  /** @name PalletSudoEvent (32) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: "Sudid" | "KeyChanged" | "SudoAsDone";
  }
  /** @name PalletStakingPalletEvent (36) */
  interface PalletStakingPalletEvent extends Enum {
    readonly isEraPaid: boolean;
    readonly asEraPaid: {
      readonly eraIndex: u32;
      readonly validatorPayout: u128;
      readonly remainder: u128;
    } & Struct;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly staker: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashReported: boolean;
    readonly asSlashReported: {
      readonly validator: AccountId32;
      readonly fraction: Perbill;
      readonly slashEra: u32;
    } & Struct;
    readonly isOldSlashingReportDiscarded: boolean;
    readonly asOldSlashingReportDiscarded: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly isStakersElected: boolean;
    readonly isBonded: boolean;
    readonly asBonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnbonded: boolean;
    readonly asUnbonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isKicked: boolean;
    readonly asKicked: {
      readonly nominator: AccountId32;
      readonly stash: AccountId32;
    } & Struct;
    readonly isStakingElectionFailed: boolean;
    readonly isChilled: boolean;
    readonly asChilled: {
      readonly stash: AccountId32;
    } & Struct;
    readonly isPayoutStarted: boolean;
    readonly asPayoutStarted: {
      readonly eraIndex: u32;
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isValidatorPrefsSet: boolean;
    readonly asValidatorPrefsSet: {
      readonly stash: AccountId32;
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isForceEra: boolean;
    readonly asForceEra: {
      readonly mode: PalletStakingForcing;
    } & Struct;
    readonly type:
      | "EraPaid"
      | "Rewarded"
      | "Slashed"
      | "SlashReported"
      | "OldSlashingReportDiscarded"
      | "StakersElected"
      | "Bonded"
      | "Unbonded"
      | "Withdrawn"
      | "Kicked"
      | "StakingElectionFailed"
      | "Chilled"
      | "PayoutStarted"
      | "ValidatorPrefsSet"
      | "ForceEra";
  }
  /** @name PalletStakingValidatorPrefs (38) */
  interface PalletStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
    readonly blocked: bool;
  }
  /** @name PalletStakingForcing (41) */
  interface PalletStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: "NotForcing" | "ForceNew" | "ForceNone" | "ForceAlways";
  }
  /** @name PalletElectionProviderMultiPhaseEvent (42) */
  interface PalletElectionProviderMultiPhaseEvent extends Enum {
    readonly isSolutionStored: boolean;
    readonly asSolutionStored: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly origin: Option<AccountId32>;
      readonly prevEjected: bool;
    } & Struct;
    readonly isElectionFinalized: boolean;
    readonly asElectionFinalized: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly score: SpNposElectionsElectionScore;
    } & Struct;
    readonly isElectionFailed: boolean;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isPhaseTransitioned: boolean;
    readonly asPhaseTransitioned: {
      readonly from: PalletElectionProviderMultiPhasePhase;
      readonly to: PalletElectionProviderMultiPhasePhase;
      readonly round: u32;
    } & Struct;
    readonly type:
      | "SolutionStored"
      | "ElectionFinalized"
      | "ElectionFailed"
      | "Rewarded"
      | "Slashed"
      | "PhaseTransitioned";
  }
  /** @name PalletElectionProviderMultiPhaseElectionCompute (43) */
  interface PalletElectionProviderMultiPhaseElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly isFallback: boolean;
    readonly isEmergency: boolean;
    readonly type: "OnChain" | "Signed" | "Unsigned" | "Fallback" | "Emergency";
  }
  /** @name SpNposElectionsElectionScore (44) */
  interface SpNposElectionsElectionScore extends Struct {
    readonly minimalStake: u128;
    readonly sumStake: u128;
    readonly sumStakeSquared: u128;
  }
  /** @name PalletElectionProviderMultiPhasePhase (45) */
  interface PalletElectionProviderMultiPhasePhase extends Enum {
    readonly isOff: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly asUnsigned: ITuple<[bool, u32]>;
    readonly isEmergency: boolean;
    readonly type: "Off" | "Signed" | "Unsigned" | "Emergency";
  }
  /** @name PalletSessionEvent (47) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: "NewSession";
  }
  /** @name PalletGrandpaEvent (48) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: "NewAuthorities" | "Paused" | "Resumed";
  }
  /** @name SpFinalityGrandpaAppPublic (51) */
  interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}
  /** @name SpCoreEd25519Public (52) */
  interface SpCoreEd25519Public extends U8aFixed {}
  /** @name PalletBagsListEvent (53) */
  interface PalletBagsListEvent extends Enum {
    readonly isRebagged: boolean;
    readonly asRebagged: {
      readonly who: AccountId32;
      readonly from: u64;
      readonly to: u64;
    } & Struct;
    readonly isScoreUpdated: boolean;
    readonly asScoreUpdated: {
      readonly who: AccountId32;
      readonly newScore: u64;
    } & Struct;
    readonly type: "Rebagged" | "ScoreUpdated";
  }
  /** @name PalletIdentityEvent (54) */
  type PalletIdentityEvent = Null;
  /** @name PalletAppreciationEvent (55) */
  interface PalletAppreciationEvent extends Enum {
    readonly isNewCommunityAdmin: boolean;
    readonly asNewCommunityAdmin: {
      readonly communityId: u32;
      readonly communityName: Bytes;
      readonly accountId: AccountId32;
      readonly username: Bytes;
      readonly phoneNumber: Bytes;
    } & Struct;
    readonly type: "NewCommunityAdmin";
  }
  /** @name PalletTransactionIndexerEvent (59) */
  type PalletTransactionIndexerEvent = Null;
  /** @name FrameSystemPhase (60) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: "ApplyExtrinsic" | "Finalization" | "Initialization";
  }
  /** @name FrameSystemLastRuntimeUpgradeInfo (64) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }
  /** @name FrameSystemCall (67) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type:
      | "Remark"
      | "SetHeapPages"
      | "SetCode"
      | "SetCodeWithoutChecks"
      | "SetStorage"
      | "KillStorage"
      | "KillPrefix"
      | "RemarkWithEvent";
  }
  /** @name FrameSystemLimitsBlockWeights (71) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }
  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (72) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }
  /** @name FrameSystemLimitsWeightsPerClass (73) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }
  /** @name FrameSystemLimitsBlockLength (75) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }
  /** @name FrameSupportDispatchPerDispatchClassU32 (76) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }
  /** @name SpWeightsRuntimeDbWeight (77) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }
  /** @name SpVersionRuntimeVersion (78) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }
  /** @name FrameSystemError (84) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type:
      | "InvalidSpecName"
      | "SpecVersionNeedsToIncrease"
      | "FailedToExtractRuntimeVersion"
      | "NonDefaultComposite"
      | "NonZeroRefCount"
      | "CallFiltered";
  }
  /** @name SpConsensusBabeAppPublic (87) */
  interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}
  /** @name SpCoreSr25519Public (88) */
  interface SpCoreSr25519Public extends U8aFixed {}
  /** @name SpConsensusBabeDigestsNextConfigDescriptor (91) */
  interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: "V1";
  }
  /** @name SpConsensusBabeAllowedSlots (93) */
  interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type:
      | "PrimarySlots"
      | "PrimaryAndSecondaryPlainSlots"
      | "PrimaryAndSecondaryVRFSlots";
  }
  /** @name SpConsensusBabeDigestsPreDigest (97) */
  interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: "Primary" | "SecondaryPlain" | "SecondaryVRF";
  }
  /** @name SpConsensusBabeDigestsPrimaryPreDigest (98) */
  interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }
  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (100) */
  interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }
  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (101) */
  interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }
  /** @name SpConsensusBabeBabeEpochConfiguration (103) */
  interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }
  /** @name PalletBabeCall (104) */
  interface PalletBabeCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isPlanConfigChange: boolean;
    readonly asPlanConfigChange: {
      readonly config: SpConsensusBabeDigestsNextConfigDescriptor;
    } & Struct;
    readonly type:
      | "ReportEquivocation"
      | "ReportEquivocationUnsigned"
      | "PlanConfigChange";
  }
  /** @name SpConsensusSlotsEquivocationProof (105) */
  interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }
  /** @name SpRuntimeHeader (106) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }
  /** @name SpRuntimeBlakeTwo256 (107) */
  type SpRuntimeBlakeTwo256 = Null;
  /** @name SpSessionMembershipProof (108) */
  interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }
  /** @name PalletBabeError (109) */
  interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type:
      | "InvalidEquivocationProof"
      | "InvalidKeyOwnershipProof"
      | "DuplicateOffenceReport"
      | "InvalidConfiguration";
  }
  /** @name PalletTimestampCall (110) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: "Set";
  }
  /** @name PalletBalancesBalanceLock (112) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }
  /** @name PalletBalancesReasons (113) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: "Fee" | "Misc" | "All";
  }
  /** @name PalletBalancesReserveData (116) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }
  /** @name PalletBalancesCall (118) */
  interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type:
      | "Transfer"
      | "SetBalance"
      | "ForceTransfer"
      | "TransferKeepAlive"
      | "TransferAll"
      | "ForceUnreserve";
  }
  /** @name PalletBalancesError (123) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type:
      | "VestingBalance"
      | "LiquidityRestrictions"
      | "InsufficientBalance"
      | "ExistentialDeposit"
      | "KeepAlive"
      | "ExistingVestingSchedule"
      | "DeadAccount"
      | "TooManyReserves";
  }
  /** @name PalletTransactionPaymentReleases (125) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: "V1Ancient" | "V2";
  }
  /** @name PalletSudoCall (126) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: "Sudo" | "SudoUncheckedWeight" | "SetKey" | "SudoAs";
  }
  /** @name PalletAuthorshipCall (128) */
  interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: "SetUncles";
  }
  /** @name PalletStakingPalletCall (130) */
  interface PalletStakingPalletCall extends Enum {
    readonly isBond: boolean;
    readonly asBond: {
      readonly controller: MultiAddress;
      readonly value: Compact<u128>;
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isBondExtra: boolean;
    readonly asBondExtra: {
      readonly maxAdditional: Compact<u128>;
    } & Struct;
    readonly isUnbond: boolean;
    readonly asUnbond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isWithdrawUnbonded: boolean;
    readonly asWithdrawUnbonded: {
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isValidate: boolean;
    readonly asValidate: {
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isNominate: boolean;
    readonly asNominate: {
      readonly targets: Vec<MultiAddress>;
    } & Struct;
    readonly isChill: boolean;
    readonly isSetPayee: boolean;
    readonly asSetPayee: {
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isSetController: boolean;
    readonly asSetController: {
      readonly controller: MultiAddress;
    } & Struct;
    readonly isSetValidatorCount: boolean;
    readonly asSetValidatorCount: {
      readonly new_: Compact<u32>;
    } & Struct;
    readonly isIncreaseValidatorCount: boolean;
    readonly asIncreaseValidatorCount: {
      readonly additional: Compact<u32>;
    } & Struct;
    readonly isScaleValidatorCount: boolean;
    readonly asScaleValidatorCount: {
      readonly factor: Percent;
    } & Struct;
    readonly isForceNoEras: boolean;
    readonly isForceNewEra: boolean;
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: {
      readonly invulnerables: Vec<AccountId32>;
    } & Struct;
    readonly isForceUnstake: boolean;
    readonly asForceUnstake: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isForceNewEraAlways: boolean;
    readonly isCancelDeferredSlash: boolean;
    readonly asCancelDeferredSlash: {
      readonly era: u32;
      readonly slashIndices: Vec<u32>;
    } & Struct;
    readonly isPayoutStakers: boolean;
    readonly asPayoutStakers: {
      readonly validatorStash: AccountId32;
      readonly era: u32;
    } & Struct;
    readonly isRebond: boolean;
    readonly asRebond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isReapStash: boolean;
    readonly asReapStash: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isKick: boolean;
    readonly asKick: {
      readonly who: Vec<MultiAddress>;
    } & Struct;
    readonly isSetStakingConfigs: boolean;
    readonly asSetStakingConfigs: {
      readonly minNominatorBond: PalletStakingPalletConfigOpU128;
      readonly minValidatorBond: PalletStakingPalletConfigOpU128;
      readonly maxNominatorCount: PalletStakingPalletConfigOpU32;
      readonly maxValidatorCount: PalletStakingPalletConfigOpU32;
      readonly chillThreshold: PalletStakingPalletConfigOpPercent;
      readonly minCommission: PalletStakingPalletConfigOpPerbill;
    } & Struct;
    readonly isChillOther: boolean;
    readonly asChillOther: {
      readonly controller: AccountId32;
    } & Struct;
    readonly isForceApplyMinCommission: boolean;
    readonly asForceApplyMinCommission: {
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isSetMinCommission: boolean;
    readonly asSetMinCommission: {
      readonly new_: Perbill;
    } & Struct;
    readonly type:
      | "Bond"
      | "BondExtra"
      | "Unbond"
      | "WithdrawUnbonded"
      | "Validate"
      | "Nominate"
      | "Chill"
      | "SetPayee"
      | "SetController"
      | "SetValidatorCount"
      | "IncreaseValidatorCount"
      | "ScaleValidatorCount"
      | "ForceNoEras"
      | "ForceNewEra"
      | "SetInvulnerables"
      | "ForceUnstake"
      | "ForceNewEraAlways"
      | "CancelDeferredSlash"
      | "PayoutStakers"
      | "Rebond"
      | "ReapStash"
      | "Kick"
      | "SetStakingConfigs"
      | "ChillOther"
      | "ForceApplyMinCommission"
      | "SetMinCommission";
  }
  /** @name PalletStakingRewardDestination (131) */
  interface PalletStakingRewardDestination extends Enum {
    readonly isStaked: boolean;
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isNone: boolean;
    readonly type: "Staked" | "Stash" | "Controller" | "Account" | "None";
  }
  /** @name PalletStakingPalletConfigOpU128 (136) */
  interface PalletStakingPalletConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: "Noop" | "Set" | "Remove";
  }
  /** @name PalletStakingPalletConfigOpU32 (137) */
  interface PalletStakingPalletConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: "Noop" | "Set" | "Remove";
  }
  /** @name PalletStakingPalletConfigOpPercent (138) */
  interface PalletStakingPalletConfigOpPercent extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Percent;
    readonly isRemove: boolean;
    readonly type: "Noop" | "Set" | "Remove";
  }
  /** @name PalletStakingPalletConfigOpPerbill (139) */
  interface PalletStakingPalletConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: "Noop" | "Set" | "Remove";
  }
  /** @name PalletElectionProviderMultiPhaseCall (140) */
  interface PalletElectionProviderMultiPhaseCall extends Enum {
    readonly isSubmitUnsigned: boolean;
    readonly asSubmitUnsigned: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
      readonly witness: PalletElectionProviderMultiPhaseSolutionOrSnapshotSize;
    } & Struct;
    readonly isSetMinimumUntrustedScore: boolean;
    readonly asSetMinimumUntrustedScore: {
      readonly maybeNextScore: Option<SpNposElectionsElectionScore>;
    } & Struct;
    readonly isSetEmergencyElectionResult: boolean;
    readonly asSetEmergencyElectionResult: {
      readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    } & Struct;
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    } & Struct;
    readonly isGovernanceFallback: boolean;
    readonly asGovernanceFallback: {
      readonly maybeMaxVoters: Option<u32>;
      readonly maybeMaxTargets: Option<u32>;
    } & Struct;
    readonly type:
      | "SubmitUnsigned"
      | "SetMinimumUntrustedScore"
      | "SetEmergencyElectionResult"
      | "Submit"
      | "GovernanceFallback";
  }
  /** @name PalletElectionProviderMultiPhaseRawSolution (141) */
  interface PalletElectionProviderMultiPhaseRawSolution extends Struct {
    readonly solution: KarmachainNodeRuntimePalletsElectionProviderMultiPhaseNposCompactSolution16;
    readonly score: SpNposElectionsElectionScore;
    readonly round: u32;
  }
  /** @name KarmachainNodeRuntimePalletsElectionProviderMultiPhaseNposCompactSolution16 (142) */
  interface KarmachainNodeRuntimePalletsElectionProviderMultiPhaseNposCompactSolution16
    extends Struct {
    readonly votes1: Vec<ITuple<[Compact<u32>, Compact<u16>]>>;
    readonly votes2: Vec<
      ITuple<
        [Compact<u32>, ITuple<[Compact<u16>, Compact<PerU16>]>, Compact<u16>]
      >
    >;
    readonly votes3: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes4: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes5: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes6: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes7: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes8: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes9: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes10: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes11: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes12: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes13: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes14: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes15: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
    readonly votes16: Vec<
      ITuple<
        [
          Compact<u32>,
          Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>,
          Compact<u16>
        ]
      >
    >;
  }
  /** @name PalletElectionProviderMultiPhaseSolutionOrSnapshotSize (193) */
  interface PalletElectionProviderMultiPhaseSolutionOrSnapshotSize
    extends Struct {
    readonly voters: Compact<u32>;
    readonly targets: Compact<u32>;
  }
  /** @name SpNposElectionsSupport (197) */
  interface SpNposElectionsSupport extends Struct {
    readonly total: u128;
    readonly voters: Vec<ITuple<[AccountId32, u128]>>;
  }
  /** @name PalletSessionCall (201) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: KarmachainNodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: "SetKeys" | "PurgeKeys";
  }
  /** @name KarmachainNodeRuntimeOpaqueSessionKeys (202) */
  interface KarmachainNodeRuntimeOpaqueSessionKeys extends Struct {
    readonly babe: SpConsensusBabeAppPublic;
    readonly grandpa: SpFinalityGrandpaAppPublic;
  }
  /** @name PalletGrandpaCall (203) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type:
      | "ReportEquivocation"
      | "ReportEquivocationUnsigned"
      | "NoteStalled";
  }
  /** @name SpFinalityGrandpaEquivocationProof (204) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }
  /** @name SpFinalityGrandpaEquivocation (205) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: "Prevote" | "Precommit";
  }
  /** @name FinalityGrandpaEquivocationPrevote (206) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<
      [FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]
    >;
    readonly second: ITuple<
      [FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]
    >;
  }
  /** @name FinalityGrandpaPrevote (207) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }
  /** @name SpFinalityGrandpaAppSignature (208) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}
  /** @name SpCoreEd25519Signature (209) */
  interface SpCoreEd25519Signature extends U8aFixed {}
  /** @name FinalityGrandpaEquivocationPrecommit (211) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<
      [FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]
    >;
    readonly second: ITuple<
      [FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]
    >;
  }
  /** @name FinalityGrandpaPrecommit (212) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }
  /** @name SpCoreVoid (214) */
  type SpCoreVoid = Null;
  /** @name PalletBagsListCall (215) */
  interface PalletBagsListCall extends Enum {
    readonly isRebag: boolean;
    readonly asRebag: {
      readonly dislocated: MultiAddress;
    } & Struct;
    readonly isPutInFrontOf: boolean;
    readonly asPutInFrontOf: {
      readonly lighter: MultiAddress;
    } & Struct;
    readonly type: "Rebag" | "PutInFrontOf";
  }
  /** @name PalletIdentityCall (216) */
  interface PalletIdentityCall extends Enum {
    readonly isNewUser: boolean;
    readonly asNewUser: {
      readonly accountId: AccountId32;
      readonly name: Bytes;
      readonly phoneNumber: Bytes;
    } & Struct;
    readonly type: "NewUser";
  }
  /** @name PalletAppreciationCall (217) */
  interface PalletAppreciationCall extends Enum {
    readonly isAppreciation: boolean;
    readonly asAppreciation: {
      readonly to: SpCommonIdentityAccountIdentity;
      readonly amount: u128;
      readonly communityId: Option<u32>;
      readonly charTraitId: Option<u32>;
    } & Struct;
    readonly isSetAdmin: boolean;
    readonly asSetAdmin: {
      readonly communityId: u32;
      readonly newAdmin: SpCommonIdentityAccountIdentity;
    } & Struct;
    readonly type: "Appreciation" | "SetAdmin";
  }
  /** @name SpCommonIdentityAccountIdentity (218) */
  interface SpCommonIdentityAccountIdentity extends Enum {
    readonly isAccountId: boolean;
    readonly asAccountId: AccountId32;
    readonly isPhoneNumber: boolean;
    readonly asPhoneNumber: Bytes;
    readonly isName: boolean;
    readonly asName: Bytes;
    readonly type: "AccountId" | "PhoneNumber" | "Name";
  }
  /** @name PalletSudoError (219) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: "RequireSudo";
  }
  /** @name PalletAuthorshipUncleEntryItem (221) */
  interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: "InclusionHeight" | "Uncle";
  }
  /** @name PalletAuthorshipError (223) */
  interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type:
      | "InvalidUncleParent"
      | "UnclesAlreadySet"
      | "TooManyUncles"
      | "GenesisUncle"
      | "TooHighUncle"
      | "UncleAlreadyIncluded"
      | "OldUncle";
  }
  /** @name PalletStakingStakingLedger (224) */
  interface PalletStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<PalletStakingUnlockChunk>;
    readonly claimedRewards: Vec<u32>;
  }
  /** @name PalletStakingUnlockChunk (226) */
  interface PalletStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }
  /** @name PalletStakingNominations (229) */
  interface PalletStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
    readonly suppressed: bool;
  }
  /** @name PalletStakingActiveEraInfo (231) */
  interface PalletStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }
  /** @name PalletStakingExposure (234) */
  interface PalletStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<PalletStakingIndividualExposure>;
  }
  /** @name PalletStakingIndividualExposure (236) */
  interface PalletStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }
  /** @name PalletStakingEraRewardPoints (237) */
  interface PalletStakingEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }
  /** @name PalletStakingUnappliedSlash (242) */
  interface PalletStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }
  /** @name PalletStakingSlashingSlashingSpans (244) */
  interface PalletStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }
  /** @name PalletStakingSlashingSpanRecord (245) */
  interface PalletStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }
  /** @name PalletStakingPalletError (248) */
  interface PalletStakingPalletError extends Enum {
    readonly isNotController: boolean;
    readonly isNotStash: boolean;
    readonly isAlreadyBonded: boolean;
    readonly isAlreadyPaired: boolean;
    readonly isEmptyTargets: boolean;
    readonly isDuplicateIndex: boolean;
    readonly isInvalidSlashIndex: boolean;
    readonly isInsufficientBond: boolean;
    readonly isNoMoreChunks: boolean;
    readonly isNoUnlockChunk: boolean;
    readonly isFundedTarget: boolean;
    readonly isInvalidEraToReward: boolean;
    readonly isInvalidNumberOfNominations: boolean;
    readonly isNotSortedAndUnique: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isIncorrectHistoryDepth: boolean;
    readonly isIncorrectSlashingSpans: boolean;
    readonly isBadState: boolean;
    readonly isTooManyTargets: boolean;
    readonly isBadTarget: boolean;
    readonly isCannotChillOther: boolean;
    readonly isTooManyNominators: boolean;
    readonly isTooManyValidators: boolean;
    readonly isCommissionTooLow: boolean;
    readonly isBoundNotMet: boolean;
    readonly type:
      | "NotController"
      | "NotStash"
      | "AlreadyBonded"
      | "AlreadyPaired"
      | "EmptyTargets"
      | "DuplicateIndex"
      | "InvalidSlashIndex"
      | "InsufficientBond"
      | "NoMoreChunks"
      | "NoUnlockChunk"
      | "FundedTarget"
      | "InvalidEraToReward"
      | "InvalidNumberOfNominations"
      | "NotSortedAndUnique"
      | "AlreadyClaimed"
      | "IncorrectHistoryDepth"
      | "IncorrectSlashingSpans"
      | "BadState"
      | "TooManyTargets"
      | "BadTarget"
      | "CannotChillOther"
      | "TooManyNominators"
      | "TooManyValidators"
      | "CommissionTooLow"
      | "BoundNotMet";
  }
  /** @name PalletElectionProviderMultiPhaseReadySolution (249) */
  interface PalletElectionProviderMultiPhaseReadySolution extends Struct {
    readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    readonly score: SpNposElectionsElectionScore;
    readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
  }
  /** @name PalletElectionProviderMultiPhaseRoundSnapshot (251) */
  interface PalletElectionProviderMultiPhaseRoundSnapshot extends Struct {
    readonly voters: Vec<ITuple<[AccountId32, u64, Vec<AccountId32>]>>;
    readonly targets: Vec<AccountId32>;
  }
  /** @name PalletElectionProviderMultiPhaseSignedSignedSubmission (257) */
  interface PalletElectionProviderMultiPhaseSignedSignedSubmission
    extends Struct {
    readonly who: AccountId32;
    readonly deposit: u128;
    readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    readonly callFee: u128;
  }
  /** @name PalletElectionProviderMultiPhaseError (258) */
  interface PalletElectionProviderMultiPhaseError extends Enum {
    readonly isPreDispatchEarlySubmission: boolean;
    readonly isPreDispatchWrongWinnerCount: boolean;
    readonly isPreDispatchWeakSubmission: boolean;
    readonly isSignedQueueFull: boolean;
    readonly isSignedCannotPayDeposit: boolean;
    readonly isSignedInvalidWitness: boolean;
    readonly isSignedTooMuchWeight: boolean;
    readonly isOcwCallWrongEra: boolean;
    readonly isMissingSnapshotMetadata: boolean;
    readonly isInvalidSubmissionIndex: boolean;
    readonly isCallNotAllowed: boolean;
    readonly isFallbackFailed: boolean;
    readonly isBoundNotMet: boolean;
    readonly isTooManyWinners: boolean;
    readonly type:
      | "PreDispatchEarlySubmission"
      | "PreDispatchWrongWinnerCount"
      | "PreDispatchWeakSubmission"
      | "SignedQueueFull"
      | "SignedCannotPayDeposit"
      | "SignedInvalidWitness"
      | "SignedTooMuchWeight"
      | "OcwCallWrongEra"
      | "MissingSnapshotMetadata"
      | "InvalidSubmissionIndex"
      | "CallNotAllowed"
      | "FallbackFailed"
      | "BoundNotMet"
      | "TooManyWinners";
  }
  /** @name SpCoreCryptoKeyTypeId (263) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}
  /** @name PalletSessionError (264) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type:
      | "InvalidProof"
      | "NoAssociatedValidatorId"
      | "DuplicatedKey"
      | "NoKeys"
      | "NoAccount";
  }
  /** @name PalletGrandpaStoredState (265) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: "Live" | "PendingPause" | "Paused" | "PendingResume";
  }
  /** @name PalletGrandpaStoredPendingChange (266) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }
  /** @name PalletGrandpaError (268) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type:
      | "PauseFailed"
      | "ResumeFailed"
      | "ChangePending"
      | "TooSoon"
      | "InvalidKeyOwnershipProof"
      | "InvalidEquivocationProof"
      | "DuplicateOffenceReport";
  }
  /** @name PalletBagsListListNode (269) */
  interface PalletBagsListListNode extends Struct {
    readonly id: AccountId32;
    readonly prev: Option<AccountId32>;
    readonly next: Option<AccountId32>;
    readonly bagUpper: u64;
    readonly score: u64;
  }
  /** @name PalletBagsListListBag (270) */
  interface PalletBagsListListBag extends Struct {
    readonly head: Option<AccountId32>;
    readonly tail: Option<AccountId32>;
  }
  /** @name PalletBagsListError (272) */
  interface PalletBagsListError extends Enum {
    readonly isList: boolean;
    readonly asList: PalletBagsListListListError;
    readonly type: "List";
  }
  /** @name PalletBagsListListListError (273) */
  interface PalletBagsListListListError extends Enum {
    readonly isDuplicate: boolean;
    readonly isNotHeavier: boolean;
    readonly isNotInSameBag: boolean;
    readonly isNodeNotFound: boolean;
    readonly type: "Duplicate" | "NotHeavier" | "NotInSameBag" | "NodeNotFound";
  }
  /** @name PalletIdentityIdentityStore (274) */
  interface PalletIdentityIdentityStore extends Struct {
    readonly name: Bytes;
    readonly phoneNumber: Bytes;
  }
  /** @name PalletIdentityError (276) */
  interface PalletIdentityError extends Enum {
    readonly isAlreadyRegistered: boolean;
    readonly isUserNameTaken: boolean;
    readonly isPhoneNumberTaken: boolean;
    readonly isNotFound: boolean;
    readonly isNotAllowed: boolean;
    readonly type:
      | "AlreadyRegistered"
      | "UserNameTaken"
      | "PhoneNumberTaken"
      | "NotFound"
      | "NotAllowed";
  }
  /** @name PalletAppreciationCharTrait (278) */
  interface PalletAppreciationCharTrait extends Struct {
    readonly id: u32;
    readonly name: Bytes;
    readonly emoji: Bytes;
  }
  /** @name PalletAppreciationCommunity (283) */
  interface PalletAppreciationCommunity extends Struct {
    readonly id: u32;
    readonly name: Bytes;
    readonly desc: Bytes;
    readonly emoji: Bytes;
    readonly websiteUrl: Bytes;
    readonly twitterUrl: Bytes;
    readonly instaUrl: Bytes;
    readonly faceUrl: Bytes;
    readonly discordUrl: Bytes;
    readonly charTraits: Vec<u32>;
    readonly closed: bool;
  }
  /** @name PalletAppreciationCommunityRole (288) */
  interface PalletAppreciationCommunityRole extends Enum {
    readonly isAdmin: boolean;
    readonly isMember: boolean;
    readonly isNone: boolean;
    readonly type: "Admin" | "Member" | "None";
  }
  /** @name PalletAppreciationError (291) */
  interface PalletAppreciationError extends Enum {
    readonly isNonExistentStorageValue: boolean;
    readonly isNotFound: boolean;
    readonly isCharTraitNotFound: boolean;
    readonly isCommunityNotFound: boolean;
    readonly isNotMember: boolean;
    readonly isCommunityClosed: boolean;
    readonly isNotEnoughPermission: boolean;
    readonly type:
      | "NonExistentStorageValue"
      | "NotFound"
      | "CharTraitNotFound"
      | "CommunityNotFound"
      | "NotMember"
      | "CommunityClosed"
      | "NotEnoughPermission";
  }
  /** @name PalletTransactionIndexerError (292) */
  interface PalletTransactionIndexerError extends Enum {
    readonly isBadContext: boolean;
    readonly type: "BadContext";
  }
  /** @name SpRuntimeMultiSignature (294) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: "Ed25519" | "Sr25519" | "Ecdsa";
  }
  /** @name SpCoreSr25519Signature (295) */
  interface SpCoreSr25519Signature extends U8aFixed {}
  /** @name SpCoreEcdsaSignature (296) */
  interface SpCoreEcdsaSignature extends U8aFixed {}
  /** @name FrameSystemExtensionsCheckNonZeroSender (299) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;
  /** @name FrameSystemExtensionsCheckSpecVersion (300) */
  type FrameSystemExtensionsCheckSpecVersion = Null;
  /** @name FrameSystemExtensionsCheckTxVersion (301) */
  type FrameSystemExtensionsCheckTxVersion = Null;
  /** @name FrameSystemExtensionsCheckGenesis (302) */
  type FrameSystemExtensionsCheckGenesis = Null;
  /** @name FrameSystemExtensionsCheckNonce (305) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}
  /** @name FrameSystemExtensionsCheckWeight (306) */
  type FrameSystemExtensionsCheckWeight = Null;
  /** @name PalletTransactionPaymentChargeTransactionPayment (307) */
  interface PalletTransactionPaymentChargeTransactionPayment
    extends Compact<u128> {}
  /** @name KarmachainNodeRuntimeExtensionsCheckAccount (308) */
  type KarmachainNodeRuntimeExtensionsCheckAccount = Null;
  /** @name KarmachainNodeRuntimeRuntime (309) */
  type KarmachainNodeRuntimeRuntime = Null;
}
