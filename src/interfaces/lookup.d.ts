declare const _default: {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: string;
    consumers: string;
    providers: string;
    sufficients: string;
    data: string;
  };
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: string;
    reserved: string;
    miscFrozen: string;
    feeFrozen: string;
  };
  /**
   * Lookup7: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: string;
    operational: string;
    mandatory: string;
  };
  /**
   * Lookup8: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: string;
    proofSize: string;
  };
  /**
   * Lookup13: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: string;
  };
  /**
   * Lookup15: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: string;
      __Unused1: string;
      __Unused2: string;
      __Unused3: string;
      Consensus: string;
      Seal: string;
      PreRuntime: string;
      __Unused7: string;
      RuntimeEnvironmentUpdated: string;
    };
  };
  /**
   * Lookup18: frame_system::EventRecord<karmachain_node_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: string;
    event: string;
    topics: string;
  };
  /**
   * Lookup20: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: string;
      };
      ExtrinsicFailed: {
        dispatchError: string;
        dispatchInfo: string;
      };
      CodeUpdated: string;
      NewAccount: {
        account: string;
      };
      KilledAccount: {
        account: string;
      };
      Remarked: {
        _alias: {
          hash_: string;
        };
        sender: string;
        hash_: string;
      };
    };
  };
  /**
   * Lookup21: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: string;
    class: string;
    paysFee: string;
  };
  /**
   * Lookup22: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: string[];
  };
  /**
   * Lookup23: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: string[];
  };
  /**
   * Lookup24: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: string;
      CannotLookup: string;
      BadOrigin: string;
      Module: string;
      ConsumerRemaining: string;
      NoProviders: string;
      TooManyConsumers: string;
      Token: string;
      Arithmetic: string;
      Transactional: string;
      Exhausted: string;
      Corruption: string;
      Unavailable: string;
    };
  };
  /**
   * Lookup25: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: string;
    error: string;
  };
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: string[];
  };
  /**
   * Lookup27: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: string[];
  };
  /**
   * Lookup28: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: string[];
  };
  /**
   * Lookup29: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: string;
        freeBalance: string;
      };
      DustLost: {
        account: string;
        amount: string;
      };
      Transfer: {
        from: string;
        to: string;
        amount: string;
      };
      BalanceSet: {
        who: string;
        free: string;
        reserved: string;
      };
      Reserved: {
        who: string;
        amount: string;
      };
      Unreserved: {
        who: string;
        amount: string;
      };
      ReserveRepatriated: {
        from: string;
        to: string;
        amount: string;
        destinationStatus: string;
      };
      Deposit: {
        who: string;
        amount: string;
      };
      Withdraw: {
        who: string;
        amount: string;
      };
      Slashed: {
        who: string;
        amount: string;
      };
    };
  };
  /**
   * Lookup30: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: string[];
  };
  /**
   * Lookup31: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: string;
        actualFee: string;
        tip: string;
      };
    };
  };
  /**
   * Lookup32: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: string;
      };
      KeyChanged: {
        oldSudoer: string;
      };
      SudoAsDone: {
        sudoResult: string;
      };
    };
  };
  /**
   * Lookup36: pallet_staking::pallet::pallet::Event<T>
   **/
  PalletStakingPalletEvent: {
    _enum: {
      EraPaid: {
        eraIndex: string;
        validatorPayout: string;
        remainder: string;
      };
      Rewarded: {
        stash: string;
        amount: string;
      };
      Slashed: {
        staker: string;
        amount: string;
      };
      SlashReported: {
        validator: string;
        fraction: string;
        slashEra: string;
      };
      OldSlashingReportDiscarded: {
        sessionIndex: string;
      };
      StakersElected: string;
      Bonded: {
        stash: string;
        amount: string;
      };
      Unbonded: {
        stash: string;
        amount: string;
      };
      Withdrawn: {
        stash: string;
        amount: string;
      };
      Kicked: {
        nominator: string;
        stash: string;
      };
      StakingElectionFailed: string;
      Chilled: {
        stash: string;
      };
      PayoutStarted: {
        eraIndex: string;
        validatorStash: string;
      };
      ValidatorPrefsSet: {
        stash: string;
        prefs: string;
      };
      ForceEra: {
        mode: string;
      };
    };
  };
  /**
   * Lookup38: pallet_staking::ValidatorPrefs
   **/
  PalletStakingValidatorPrefs: {
    commission: string;
    blocked: string;
  };
  /**
   * Lookup41: pallet_staking::Forcing
   **/
  PalletStakingForcing: {
    _enum: string[];
  };
  /**
   * Lookup42: pallet_election_provider_multi_phase::pallet::Event<T>
   **/
  PalletElectionProviderMultiPhaseEvent: {
    _enum: {
      SolutionStored: {
        compute: string;
        origin: string;
        prevEjected: string;
      };
      ElectionFinalized: {
        compute: string;
        score: string;
      };
      ElectionFailed: string;
      Rewarded: {
        account: string;
        value: string;
      };
      Slashed: {
        account: string;
        value: string;
      };
      PhaseTransitioned: {
        from: string;
        to: string;
        round: string;
      };
    };
  };
  /**
   * Lookup43: pallet_election_provider_multi_phase::ElectionCompute
   **/
  PalletElectionProviderMultiPhaseElectionCompute: {
    _enum: string[];
  };
  /**
   * Lookup44: sp_npos_elections::ElectionScore
   **/
  SpNposElectionsElectionScore: {
    minimalStake: string;
    sumStake: string;
    sumStakeSquared: string;
  };
  /**
   * Lookup45: pallet_election_provider_multi_phase::Phase<Bn>
   **/
  PalletElectionProviderMultiPhasePhase: {
    _enum: {
      Off: string;
      Signed: string;
      Unsigned: string;
      Emergency: string;
    };
  };
  /**
   * Lookup47: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: string;
      };
    };
  };
  /**
   * Lookup48: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: string;
      };
      Paused: string;
      Resumed: string;
    };
  };
  /**
   * Lookup51: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: string;
  /**
   * Lookup52: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: string;
  /**
   * Lookup53: pallet_bags_list::pallet::Event<T, I>
   **/
  PalletBagsListEvent: {
    _enum: {
      Rebagged: {
        who: string;
        from: string;
        to: string;
      };
      ScoreUpdated: {
        who: string;
        newScore: string;
      };
    };
  };
  /**
   * Lookup54: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: string;
  /**
   * Lookup55: pallet_appreciation::pallet::Event<T>
   **/
  PalletAppreciationEvent: {
    _enum: {
      NewCommunityAdmin: {
        communityId: string;
        communityName: string;
        accountId: string;
        username: string;
        phoneNumber: string;
      };
    };
  };
  /**
   * Lookup59: pallet_transaction_indexer::pallet::Event<T>
   **/
  PalletTransactionIndexerEvent: string;
  /**
   * Lookup60: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: string;
      Finalization: string;
      Initialization: string;
    };
  };
  /**
   * Lookup64: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: string;
    specName: string;
  };
  /**
   * Lookup67: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: string;
      };
      set_heap_pages: {
        pages: string;
      };
      set_code: {
        code: string;
      };
      set_code_without_checks: {
        code: string;
      };
      set_storage: {
        items: string;
      };
      kill_storage: {
        _alias: {
          keys_: string;
        };
        keys_: string;
      };
      kill_prefix: {
        prefix: string;
        subkeys: string;
      };
      remark_with_event: {
        remark: string;
      };
    };
  };
  /**
   * Lookup71: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: string;
    maxBlock: string;
    perClass: string;
  };
  /**
   * Lookup72: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: string;
    operational: string;
    mandatory: string;
  };
  /**
   * Lookup73: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: string;
    maxExtrinsic: string;
    maxTotal: string;
    reserved: string;
  };
  /**
   * Lookup75: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: string;
  };
  /**
   * Lookup76: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: string;
    operational: string;
    mandatory: string;
  };
  /**
   * Lookup77: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: string;
    write: string;
  };
  /**
   * Lookup78: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: string;
    implName: string;
    authoringVersion: string;
    specVersion: string;
    implVersion: string;
    apis: string;
    transactionVersion: string;
    stateVersion: string;
  };
  /**
   * Lookup84: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: string[];
  };
  /**
   * Lookup87: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: string;
  /**
   * Lookup88: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: string;
  /**
   * Lookup91: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: string;
      V1: {
        c: string;
        allowedSlots: string;
      };
    };
  };
  /**
   * Lookup93: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: string[];
  };
  /**
   * Lookup97: sp_consensus_babe::digests::PreDigest
   **/
  SpConsensusBabeDigestsPreDigest: {
    _enum: {
      __Unused0: string;
      Primary: string;
      SecondaryPlain: string;
      SecondaryVRF: string;
    };
  };
  /**
   * Lookup98: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: string;
    slot: string;
    vrfOutput: string;
    vrfProof: string;
  };
  /**
   * Lookup100: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: string;
    slot: string;
  };
  /**
   * Lookup101: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: string;
    slot: string;
    vrfOutput: string;
    vrfProof: string;
  };
  /**
   * Lookup103: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: string;
    allowedSlots: string;
  };
  /**
   * Lookup104: pallet_babe::pallet::Call<T>
   **/
  PalletBabeCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: string;
        keyOwnerProof: string;
      };
      report_equivocation_unsigned: {
        equivocationProof: string;
        keyOwnerProof: string;
      };
      plan_config_change: {
        config: string;
      };
    };
  };
  /**
   * Lookup105: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: string;
    slot: string;
    firstHeader: string;
    secondHeader: string;
  };
  /**
   * Lookup106: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: string;
    number: string;
    stateRoot: string;
    extrinsicsRoot: string;
    digest: string;
  };
  /**
   * Lookup107: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: string;
  /**
   * Lookup108: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: string;
    trieNodes: string;
    validatorCount: string;
  };
  /**
   * Lookup109: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: string[];
  };
  /**
   * Lookup110: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: string;
      };
    };
  };
  /**
   * Lookup112: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: string;
    amount: string;
    reasons: string;
  };
  /**
   * Lookup113: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: string[];
  };
  /**
   * Lookup116: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: string;
    amount: string;
  };
  /**
   * Lookup118: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: string;
        value: string;
      };
      set_balance: {
        who: string;
        newFree: string;
        newReserved: string;
      };
      force_transfer: {
        source: string;
        dest: string;
        value: string;
      };
      transfer_keep_alive: {
        dest: string;
        value: string;
      };
      transfer_all: {
        dest: string;
        keepAlive: string;
      };
      force_unreserve: {
        who: string;
        amount: string;
      };
    };
  };
  /**
   * Lookup123: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: string[];
  };
  /**
   * Lookup125: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: string[];
  };
  /**
   * Lookup126: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: string;
      };
      sudo_unchecked_weight: {
        call: string;
        weight: string;
      };
      set_key: {
        _alias: {
          new_: string;
        };
        new_: string;
      };
      sudo_as: {
        who: string;
        call: string;
      };
    };
  };
  /**
   * Lookup128: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: string;
      };
    };
  };
  /**
   * Lookup130: pallet_staking::pallet::pallet::Call<T>
   **/
  PalletStakingPalletCall: {
    _enum: {
      bond: {
        controller: string;
        value: string;
        payee: string;
      };
      bond_extra: {
        maxAdditional: string;
      };
      unbond: {
        value: string;
      };
      withdraw_unbonded: {
        numSlashingSpans: string;
      };
      validate: {
        prefs: string;
      };
      nominate: {
        targets: string;
      };
      chill: string;
      set_payee: {
        payee: string;
      };
      set_controller: {
        controller: string;
      };
      set_validator_count: {
        _alias: {
          new_: string;
        };
        new_: string;
      };
      increase_validator_count: {
        additional: string;
      };
      scale_validator_count: {
        factor: string;
      };
      force_no_eras: string;
      force_new_era: string;
      set_invulnerables: {
        invulnerables: string;
      };
      force_unstake: {
        stash: string;
        numSlashingSpans: string;
      };
      force_new_era_always: string;
      cancel_deferred_slash: {
        era: string;
        slashIndices: string;
      };
      payout_stakers: {
        validatorStash: string;
        era: string;
      };
      rebond: {
        value: string;
      };
      reap_stash: {
        stash: string;
        numSlashingSpans: string;
      };
      kick: {
        who: string;
      };
      set_staking_configs: {
        minNominatorBond: string;
        minValidatorBond: string;
        maxNominatorCount: string;
        maxValidatorCount: string;
        chillThreshold: string;
        minCommission: string;
      };
      chill_other: {
        controller: string;
      };
      force_apply_min_commission: {
        validatorStash: string;
      };
      set_min_commission: {
        _alias: {
          new_: string;
        };
        new_: string;
      };
    };
  };
  /**
   * Lookup131: pallet_staking::RewardDestination<sp_core::crypto::AccountId32>
   **/
  PalletStakingRewardDestination: {
    _enum: {
      Staked: string;
      Stash: string;
      Controller: string;
      Account: string;
      None: string;
    };
  };
  /**
   * Lookup136: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU128: {
    _enum: {
      Noop: string;
      Set: string;
      Remove: string;
    };
  };
  /**
   * Lookup137: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU32: {
    _enum: {
      Noop: string;
      Set: string;
      Remove: string;
    };
  };
  /**
   * Lookup138: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Percent>
   **/
  PalletStakingPalletConfigOpPercent: {
    _enum: {
      Noop: string;
      Set: string;
      Remove: string;
    };
  };
  /**
   * Lookup139: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Perbill>
   **/
  PalletStakingPalletConfigOpPerbill: {
    _enum: {
      Noop: string;
      Set: string;
      Remove: string;
    };
  };
  /**
   * Lookup140: pallet_election_provider_multi_phase::pallet::Call<T>
   **/
  PalletElectionProviderMultiPhaseCall: {
    _enum: {
      submit_unsigned: {
        rawSolution: string;
        witness: string;
      };
      set_minimum_untrusted_score: {
        maybeNextScore: string;
      };
      set_emergency_election_result: {
        supports: string;
      };
      submit: {
        rawSolution: string;
      };
      governance_fallback: {
        maybeMaxVoters: string;
        maybeMaxTargets: string;
      };
    };
  };
  /**
   * Lookup141: pallet_election_provider_multi_phase::RawSolution<karmachain_node_runtime::pallets::election_provider_multi_phase::NposCompactSolution16>
   **/
  PalletElectionProviderMultiPhaseRawSolution: {
    solution: string;
    score: string;
    round: string;
  };
  /**
   * Lookup142: karmachain_node_runtime::pallets::election_provider_multi_phase::NposCompactSolution16
   **/
  KarmachainNodeRuntimePalletsElectionProviderMultiPhaseNposCompactSolution16: {
    votes1: string;
    votes2: string;
    votes3: string;
    votes4: string;
    votes5: string;
    votes6: string;
    votes7: string;
    votes8: string;
    votes9: string;
    votes10: string;
    votes11: string;
    votes12: string;
    votes13: string;
    votes14: string;
    votes15: string;
    votes16: string;
  };
  /**
   * Lookup193: pallet_election_provider_multi_phase::SolutionOrSnapshotSize
   **/
  PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: {
    voters: string;
    targets: string;
  };
  /**
   * Lookup197: sp_npos_elections::Support<sp_core::crypto::AccountId32>
   **/
  SpNposElectionsSupport: {
    total: string;
    voters: string;
  };
  /**
   * Lookup201: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: string;
        };
        keys_: string;
        proof: string;
      };
      purge_keys: string;
    };
  };
  /**
   * Lookup202: karmachain_node_runtime::opaque::SessionKeys
   **/
  KarmachainNodeRuntimeOpaqueSessionKeys: {
    babe: string;
    grandpa: string;
  };
  /**
   * Lookup203: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: string;
        keyOwnerProof: string;
      };
      report_equivocation_unsigned: {
        equivocationProof: string;
        keyOwnerProof: string;
      };
      note_stalled: {
        delay: string;
        bestFinalizedBlockNumber: string;
      };
    };
  };
  /**
   * Lookup204: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: string;
    equivocation: string;
  };
  /**
   * Lookup205: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: string;
      Precommit: string;
    };
  };
  /**
   * Lookup206: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: string;
    identity: string;
    first: string;
    second: string;
  };
  /**
   * Lookup207: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: string;
    targetNumber: string;
  };
  /**
   * Lookup208: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: string;
  /**
   * Lookup209: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: string;
  /**
   * Lookup211: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: string;
    identity: string;
    first: string;
    second: string;
  };
  /**
   * Lookup212: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: string;
    targetNumber: string;
  };
  /**
   * Lookup214: sp_core::Void
   **/
  SpCoreVoid: string;
  /**
   * Lookup215: pallet_bags_list::pallet::Call<T, I>
   **/
  PalletBagsListCall: {
    _enum: {
      rebag: {
        dislocated: string;
      };
      put_in_front_of: {
        lighter: string;
      };
    };
  };
  /**
   * Lookup216: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      new_user: {
        accountId: string;
        name: string;
        phoneNumber: string;
      };
    };
  };
  /**
   * Lookup217: pallet_appreciation::pallet::Call<T>
   **/
  PalletAppreciationCall: {
    _enum: {
      appreciation: {
        to: string;
        amount: string;
        communityId: string;
        charTraitId: string;
      };
      set_admin: {
        communityId: string;
        newAdmin: string;
      };
    };
  };
  /**
   * Lookup218: sp_common::identity::AccountIdentity<sp_core::crypto::AccountId32, NameLimit, PhoneNumberLimit>
   **/
  SpCommonIdentityAccountIdentity: {
    _enum: {
      AccountId: string;
      PhoneNumber: string;
      Name: string;
    };
  };
  /**
   * Lookup219: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: string[];
  };
  /**
   * Lookup221: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: string;
      Uncle: string;
    };
  };
  /**
   * Lookup223: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: string[];
  };
  /**
   * Lookup224: pallet_staking::StakingLedger<T>
   **/
  PalletStakingStakingLedger: {
    stash: string;
    total: string;
    active: string;
    unlocking: string;
    claimedRewards: string;
  };
  /**
   * Lookup226: pallet_staking::UnlockChunk<Balance>
   **/
  PalletStakingUnlockChunk: {
    value: string;
    era: string;
  };
  /**
   * Lookup229: pallet_staking::Nominations<T>
   **/
  PalletStakingNominations: {
    targets: string;
    submittedIn: string;
    suppressed: string;
  };
  /**
   * Lookup231: pallet_staking::ActiveEraInfo
   **/
  PalletStakingActiveEraInfo: {
    index: string;
    start: string;
  };
  /**
   * Lookup234: pallet_staking::Exposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingExposure: {
    total: string;
    own: string;
    others: string;
  };
  /**
   * Lookup236: pallet_staking::IndividualExposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingIndividualExposure: {
    who: string;
    value: string;
  };
  /**
   * Lookup237: pallet_staking::EraRewardPoints<sp_core::crypto::AccountId32>
   **/
  PalletStakingEraRewardPoints: {
    total: string;
    individual: string;
  };
  /**
   * Lookup242: pallet_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingUnappliedSlash: {
    validator: string;
    own: string;
    others: string;
    reporters: string;
    payout: string;
  };
  /**
   * Lookup244: pallet_staking::slashing::SlashingSpans
   **/
  PalletStakingSlashingSlashingSpans: {
    spanIndex: string;
    lastStart: string;
    lastNonzeroSlash: string;
    prior: string;
  };
  /**
   * Lookup245: pallet_staking::slashing::SpanRecord<Balance>
   **/
  PalletStakingSlashingSpanRecord: {
    slashed: string;
    paidOut: string;
  };
  /**
   * Lookup248: pallet_staking::pallet::pallet::Error<T>
   **/
  PalletStakingPalletError: {
    _enum: string[];
  };
  /**
   * Lookup249: pallet_election_provider_multi_phase::ReadySolution<T>
   **/
  PalletElectionProviderMultiPhaseReadySolution: {
    supports: string;
    score: string;
    compute: string;
  };
  /**
   * Lookup251: pallet_election_provider_multi_phase::RoundSnapshot<T>
   **/
  PalletElectionProviderMultiPhaseRoundSnapshot: {
    voters: string;
    targets: string;
  };
  /**
   * Lookup257: pallet_election_provider_multi_phase::signed::SignedSubmission<sp_core::crypto::AccountId32, Balance, karmachain_node_runtime::pallets::election_provider_multi_phase::NposCompactSolution16>
   **/
  PalletElectionProviderMultiPhaseSignedSignedSubmission: {
    who: string;
    deposit: string;
    rawSolution: string;
    callFee: string;
  };
  /**
   * Lookup258: pallet_election_provider_multi_phase::pallet::Error<T>
   **/
  PalletElectionProviderMultiPhaseError: {
    _enum: string[];
  };
  /**
   * Lookup263: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: string;
  /**
   * Lookup264: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: string[];
  };
  /**
   * Lookup265: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: string;
      PendingPause: {
        scheduledAt: string;
        delay: string;
      };
      Paused: string;
      PendingResume: {
        scheduledAt: string;
        delay: string;
      };
    };
  };
  /**
   * Lookup266: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: string;
    delay: string;
    nextAuthorities: string;
    forced: string;
  };
  /**
   * Lookup268: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: string[];
  };
  /**
   * Lookup269: pallet_bags_list::list::Node<T, I>
   **/
  PalletBagsListListNode: {
    id: string;
    prev: string;
    next: string;
    bagUpper: string;
    score: string;
  };
  /**
   * Lookup270: pallet_bags_list::list::Bag<T, I>
   **/
  PalletBagsListListBag: {
    head: string;
    tail: string;
  };
  /**
   * Lookup272: pallet_bags_list::pallet::Error<T, I>
   **/
  PalletBagsListError: {
    _enum: {
      List: string;
    };
  };
  /**
   * Lookup273: pallet_bags_list::list::ListError
   **/
  PalletBagsListListListError: {
    _enum: string[];
  };
  /**
   * Lookup274: pallet_identity::IdentityStore<NameLimit, PhoneNumberLimit>
   **/
  PalletIdentityIdentityStore: {
    name: string;
    phoneNumber: string;
  };
  /**
   * Lookup276: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: string[];
  };
  /**
   * Lookup278: pallet_appreciation::types::CharTrait<CharNameLimit, EmojiLimit>
   **/
  PalletAppreciationCharTrait: {
    id: string;
    name: string;
    emoji: string;
  };
  /**
   * Lookup283: pallet_appreciation::types::Community<NameLimit, DescLimit, EmojiLimit, UrlLimit, MaxCharTrait>
   **/
  PalletAppreciationCommunity: {
    id: string;
    name: string;
    desc: string;
    emoji: string;
    websiteUrl: string;
    twitterUrl: string;
    instaUrl: string;
    faceUrl: string;
    discordUrl: string;
    charTraits: string;
    closed: string;
  };
  /**
   * Lookup288: pallet_appreciation::types::CommunityRole
   **/
  PalletAppreciationCommunityRole: {
    _enum: string[];
  };
  /**
   * Lookup291: pallet_appreciation::pallet::Error<T>
   **/
  PalletAppreciationError: {
    _enum: string[];
  };
  /**
   * Lookup292: pallet_transaction_indexer::pallet::Error<T>
   **/
  PalletTransactionIndexerError: {
    _enum: string[];
  };
  /**
   * Lookup294: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: string;
      Sr25519: string;
      Ecdsa: string;
    };
  };
  /**
   * Lookup295: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: string;
  /**
   * Lookup296: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: string;
  /**
   * Lookup299: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: string;
  /**
   * Lookup300: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: string;
  /**
   * Lookup301: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: string;
  /**
   * Lookup302: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: string;
  /**
   * Lookup305: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: string;
  /**
   * Lookup306: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: string;
  /**
   * Lookup307: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: string;
  /**
   * Lookup308: karmachain_node_runtime::extensions::check_account::CheckAccount
   **/
  KarmachainNodeRuntimeExtensionsCheckAccount: string;
  /**
   * Lookup309: karmachain_node_runtime::Runtime
   **/
  KarmachainNodeRuntimeRuntime: string;
};
export default _default;
