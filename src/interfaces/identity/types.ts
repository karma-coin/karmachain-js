// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Text, Vec, bool, u32, u64 } from '@polkadot/types-codec';
import type { AccountId } from '@polkadot/types/interfaces/runtime';

/** @name CommunityMembership */
export interface CommunityMembership extends Struct {
  readonly community_id: u32;
  readonly karma_score: u32;
  readonly is_admin: bool;
}

/** @name Contact */
export interface Contact extends Struct {
  readonly user_name: Text;
  readonly account_id: AccountId;
  readonly mobile_number: Text;
  readonly community_membership: Vec<CommunityMembership>;
  readonly trait_scores: Vec<TraitScore>;
}

/** @name LeaderboardEntry */
export interface LeaderboardEntry extends Struct {
  readonly user_name: Text;
  readonly account_id: AccountId;
  readonly score: u32;
  readonly char_traits_ids: u32;
}

/** @name TraitScore */
export interface TraitScore extends Struct {
  readonly trait_id: u32;
  readonly karma_score: u32;
  readonly community_id: u32;
}

/** @name UserInfo */
export interface UserInfo extends Struct {
  readonly account_id: AccountId;
  readonly nonce: u64;
  readonly user_name: Text;
  readonly mobile_number: Text;
  readonly balance: u64;
  readonly trait_scores: Vec<TraitScore>;
  readonly karma_score: u32;
  readonly community_membership: Vec<CommunityMembership>;
}

export type PHANTOM_IDENTITY = 'identity';
