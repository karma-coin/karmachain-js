declare const _default: {
  types: {
    VerificationResult: {
      _enum: string[];
    };
    VerificationResponse: {
      verifier_account_id: string;
      verification_result: string;
      account_id: string;
      phone_number: string;
      username: string;
      signature: string;
    };
  };
  rpc: {
    verifier: {
      verify: {
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
  };
};
export default _default;
