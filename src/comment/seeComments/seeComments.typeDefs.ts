import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeComments(offset: Int!): [Comment]!
  }
`;
