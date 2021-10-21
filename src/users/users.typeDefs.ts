import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    password: String
    bio: String
    avatar: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    rank: String
    exp: Float
    maxExp: Float
    time: [Time]
    todayTime: Float
    weekTime: Float
    monthTime: Float
    totalTime: Float
    totalNumberOfTime: Float
    timePerNumber: Float
    numberPerTime: Float
    observers: [User]
    subjects: [User]
    isObserver: Boolean!
  }
  type Time {
    id: Int!
    timeValue: Float!
    user: User
    createdAt: String
    updatedAt: String!
    dayName: String!
  }
`;
