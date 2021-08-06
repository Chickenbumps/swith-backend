import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    group: Group!
    createdAt: String!
    updatedAt: String!
    read: Boolean
  }

  type Group {
    id: Int!
    title: String!
    description: String
    members: [User]!
    messages: [Message]
    unreadMessage: Int!
  }
`;
