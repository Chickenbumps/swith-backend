import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String
    email: String
    password: String
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    rank: String
    exp: Int
    maxExp: Int
    todayTime: String
    weekTime: String
    monthTime: String
    totalTime: String
  }
`;