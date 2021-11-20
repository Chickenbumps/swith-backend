import { gql } from "apollo-server-express";

export default gql`
  type ExitGroupResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    exitGroup(groupId: Int!, memberId: Int!): ExitGroupResult!
  }
`;
