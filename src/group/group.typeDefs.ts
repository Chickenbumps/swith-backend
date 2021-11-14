import { gql } from "apollo-server-express";

export default gql`
  type Group {
    id: Int!
    title: String!
    description: String
    members: [User]!
    messages: [Message]
    unreadMessage: Int!
    inviter: Inviter
    groupAvatar: String
    memberNum: Int
    createdAt: String!
    updatedAt: String!
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
