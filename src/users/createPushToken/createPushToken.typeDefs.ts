import { gql } from "apollo-server-core";

export default gql`
  type CreatePushTokenResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createPushToken(pushToken: String): CreatePushTokenResult!
  }
`;
