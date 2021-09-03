import { gql } from "apollo-server-express";

export default gql`
  type SelectObserverResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    selectObserver(username: String!): SelectObserverResult!
  }
`;
