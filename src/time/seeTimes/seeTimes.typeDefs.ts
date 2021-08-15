import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeTimes(to: String!, from: String!): [Time]!
  }
`;
