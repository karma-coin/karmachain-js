export default {
  types: {
    TraitScore: {
      trait_id: 'u32',
	    karma_score: 'u32',
	    community_id: 'u32',
    },
    CommunityMembership: {
      community_id: 'u32',
	    karma_score: 'u32',
	    is_admin: 'bool',
    },
    UserInfo: {
      account_id: 'AccountId',
	    nonce: 'u64',
	    user_name: 'Text',
	    mobile_number: 'Text',
	    balance: 'u64',
	    trait_scores: 'Vec<TraitScore>',
	    karma_score: 'u32',
	    community_membership: 'Vec<CommunityMembership>',
    },
    Contact: {
      user_name: 'Text',
	    account_id: 'AccountId',
	    mobile_number: 'Text',
	    community_membership: 'Vec<CommunityMembership>',
	    trait_scores: 'Vec<TraitScore>',
    },
    LeaderboardEntry: {
      user_name: 'Text',
	    account_id: 'AccountId',
	    score: 'u32',
	    char_traits_ids: 'u32',
    }
  },
  rpc: {
    identity: {
      getUserInfoByAccount: {
        description: 'Provides information about user account by `AccountId`',
        params: [
          {
            name: 'account_id',
            type: 'AccountId'
          },
          {
            name: 'at',
            type: 'BlockHash',
            isOptional: true,
          }
        ],
        type: 'Option<UserInfo>'
      },
      getUserInfoByName: {
        description: 'Provides information about user account by `Username`',
        params: [
          {
            name: 'name',
            type: 'Text'
          },
          {
            name: 'at',
            type: 'BlockHash',
            isOptional: true,
          },
        ],
        type: 'Option<UserInfo>'
      },
      getUserInfoByNumber: {
        description: 'Provides information about user account by `PhoneNumber`',
        params: [
          {
            name: 'number',
            type: 'Text'
          },
          {
            name: 'at',
            type: 'BlockHash',
            isOptional: true,
          },
        ],
        type: 'Option<UserInfo>'
      }
    },
    community: {
      getAllUsers: {
        description: 'provides list of community members with information about each member account',
        params: [
          {
            name: 'community_id',
            type: 'u32'
          },
          {
            name: 'at',
            type: 'BlockHash',
            isOptional: true,
          },
        ],
        type: 'Vec<UserInfo>'
      },
      getContacts: {
        description: 'provides list of users who\'s name starts with `prefix` also can be filtered by `community_id`, `None` mean no filtering',
        params: [
          {
            name: 'prefix',
            type: 'Text'
          },
          {
            name: 'community_id',
            type: 'u32'
          },
          {
            name: 'at',
            type: 'BlockHash',
            isOptional: true,
          },
        ],
        type: 'Vec<Contact>'
      },
      getLeaderBoard: {
        description: 'Provides info about karma rewards period leaderboard',
        params: [],
        type: 'Vec<LeaderboardEntry>'
      }
    }
  },
}