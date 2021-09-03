import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMessage(groupId: Int!, offset: Int!): [Message]!
  }
`;
