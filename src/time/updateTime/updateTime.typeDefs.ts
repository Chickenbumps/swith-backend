import { gql } from "apollo-server-express";

export default gql`
  type UpdateTimeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateTime(time: Float!): UpdateTimeResult!
  }
`;
