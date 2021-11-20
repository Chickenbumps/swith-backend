import { gql } from "apollo-server-express";

export default gql`
  type UpdateExpResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateExp(exp: Float!): UpdateExpResult!
  }
`;
