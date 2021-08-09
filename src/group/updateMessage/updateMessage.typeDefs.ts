import { gql } from "apollo-server-express";

export default gql`
  type Subscription {
    updateMessage(groupId: Int!): Message
  }
`;
