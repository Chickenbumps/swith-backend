import { gql } from "apollo-server-express";

export default gql`
  type FollowToggleResult {
    ok: Boolean!
    result: String
    error: String
  }
  type Mutation {
    followToggle(username: String!): FollowToggleResult!
  }
`;
