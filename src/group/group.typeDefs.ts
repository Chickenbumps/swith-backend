import { gql } from "apollo-server-express";

export default gql`
  scalar DateTime

  type Group {
    id: Int!
    title: String!
    description: String
    members: [User]!
    messages: [Message]
    unreadMessage: Int!
    inviter: Inviter
  }

  type Message {
    id: Int!
    payload: String!
    user: User!
    group: Group!
    createdAt: String!
    updatedAt: String!
    read: Boolean
  }

  type Inviter {
    id: Int!
    user: User!
    Group: [Group]
  }
`;
