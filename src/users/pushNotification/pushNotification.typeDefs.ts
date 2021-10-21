import { gql } from "apollo-server-core";
import { ObjectScalarType } from "../../shared/shared.typeDefs";

export default gql`
  type PushNotificationResult {
    ok: Boolean!
    message: ObjectScalarType
    error: String
  }

  type Mutation {
    pushNotification(username: String): PushNotificationResult!
  }
`;
