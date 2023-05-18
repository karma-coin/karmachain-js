declare const _default: {
  types: {
    TraitScore: {
      trait_id: string;
      karma_score: string;
      community_id: string;
    };
    CommunityMembership: {
      community_id: string;
      karma_score: string;
      is_admin: string;
    };
    UserInfo: {
      account_id: string;
      nonce: string;
      user_name: string;
      mobile_number: string;
      balance: string;
      trait_scores: string;
      karma_score: string;
      community_membership: string;
    };
    Contact: {
      user_name: string;
      account_id: string;
      mobile_number: string;
      community_membership: string;
      trait_scores: string;
    };
    LeaderboardEntry: {
      user_name: string;
      account_id: string;
      score: string;
      char_traits_ids: string;
    };
  };
  rpc: {
    identity: {
      getUserInfoByAccount: {
        description: string;
        params: (
          | {
              name: string;
              type: string;
              isOptional?: undefined;
            }
          | {
              name: string;
              type: string;
              isOptional: boolean;
            }
        )[];
        type: string;
      };
      getUserInfoByName: {
        description: string;
        params: (
          | {
              name: string;
              type: string;
              isOptional?: undefined;
            }
          | {
              name: string;
              type: string;
              isOptional: boolean;
            }
        )[];
        type: string;
      };
      getUserInfoByNumber: {
        description: string;
        params: (
          | {
              name: string;
              type: string;
              isOptional?: undefined;
            }
          | {
              name: string;
              type: string;
              isOptional: boolean;
            }
        )[];
        type: string;
      };
    };
    community: {
      getAllUsers: {
        description: string;
        params: (
          | {
              name: string;
              type: string;
              isOptional?: undefined;
            }
          | {
              name: string;
              type: string;
              isOptional: boolean;
            }
        )[];
        type: string;
      };
      getContacts: {
        description: string;
        params: (
          | {
              name: string;
              type: string;
              isOptional?: undefined;
            }
          | {
              name: string;
              type: string;
              isOptional: boolean;
            }
        )[];
        type: string;
      };
      getLeaderBoard: {
        description: string;
        params: never[];
        type: string;
      };
    };
  };
};
export default _default;
