import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeComments(userId: Int!, offset: Int!): [Comment]!
  }
`;
