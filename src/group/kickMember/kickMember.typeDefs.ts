import { gql } from "apollo-server-express";

export default gql`
  type KickMemberResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    kickMember(groupId: Int!, memberId: Int!): KickMemberResult!
  }
`;
