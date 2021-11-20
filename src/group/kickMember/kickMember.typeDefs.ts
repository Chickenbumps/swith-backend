import { ObjectScalarType } from "./../../shared/shared.typeDefs";
import { gql } from "apollo-server-express";

export default gql`
  type KickMemberResult {
    ok: Boolean!
    kickedUserId: Int!
    message: ObjectScalarType
    error: String
  }
  type Mutation {
    kickMember(groupId: Int!, memberId: Int!): KickMemberResult!
  }
`;
