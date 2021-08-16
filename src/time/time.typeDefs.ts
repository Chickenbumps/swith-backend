import { gql } from "apollo-server-express";

export default gql`
  type Time {
    id: Int!
    timeValue: Float!
    timeNumber: Int!
    user: User
    createdAt: String
    updatedAt: String!
    dayName: String!
  }
`;
