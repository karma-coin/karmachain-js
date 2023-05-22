/* eslint-disable @typescript-eslint/camelcase */

export default {
  types: {
    VerificationResult: {
      _enum: [
        "Unspecified",
        "UserNameTaken",
        "Verified",
        "Unverified",
        "MissingData",
        "InvalidSignature",
        "AccountMismatch",
      ],
    },
    VerificationResponse: {
      verifier_account_id: "AccountId",
      verification_result: "VerificationResult",
      account_id: "AccountId",
      phone_number: "Text",
      username: "Text",
      signature: "Bytes",
    },
  },
  rpc: {
    verifier: {
      verify: {
        description: "Verify signup params and return signed evidence",
        params: [
          {
            name: "account_id",
            type: "AccountId",
          },
          {
            name: "username",
            type: "Text",
          },
          {
            name: "phone_number",
            type: "Text",
          },
          {
            name: "bypass_token",
            type: "Text",
            isOptional: true,
          },
        ],
        type: "VerificationResponse",
      },
    },
  },
};
