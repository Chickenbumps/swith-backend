import { gql } from "apollo-server-express";

export default gql`
  type CreateGroupResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createGroup(title: String!, description: String): CreateGroupResult!
  }
`;
