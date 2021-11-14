import { gql } from "apollo-server-core";

export default gql`
  type JoinGroupResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    joinGroup(groupId: Int!): JoinGroupResult
  }
`;
