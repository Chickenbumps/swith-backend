import { gql } from "apollo-server-express";

export default gql`
  type SendMessageResult {
    ok: Boolean!
    id: Int
    error: String
  }
  type Mutation {
    sendMessage(payload: String!, groupId: Int!): SendMessageResult!
  }
`;
