import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeGroup(id: Int!, offset: Int!): Group!
  }
`;
