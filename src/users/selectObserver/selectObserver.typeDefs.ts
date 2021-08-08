import { gql } from "apollo-server-express";

export default gql`
  type SelectObserverResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    selectObserver(groupId: Int!, username: String!): SelectObserverResult!
  }
`;
