import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    username: String
    email: String
    password: String
    bio: String
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    rank: String
    exp: Int
    maxExp: Int
    time: [Time]
    todayTime: Int
    weekTime: Int
    monthTime: Int
    totalTime: Int
  }
  type Time {
    id: Int!
    timeValue: Int!
    user: User
    createdAt: DateTime
    updatedAt: DateTime!
    dayName: String!
  }
`;
