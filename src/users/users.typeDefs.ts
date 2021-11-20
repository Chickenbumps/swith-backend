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
    createdAt: String!
    updatedAt: String!
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
    comments: [Comment]
  }
  type Time {
    id: Int!
    timeValue: Float!
    user: User
    createdAt: String!
    updatedAt: String!
    dayName: String!
  }
  type Comment {
    id: Int!
    user: User
    payload: String!
    createdAt: String!
    upadtedAt: String!
    range: String!
  }
`;
