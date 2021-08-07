import { gql } from "apollo-server-express";

export default gql`
  type SendMessageResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendMessage(payload: String!, groupId: Int!): SendMessageResult!
  }
`;
