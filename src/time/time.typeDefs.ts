import { gql } from "apollo-server-express";

export default gql`
  type Time {
    id: Int!
    timeValue: Float!
    user: User
    createdAt: String
    updatedAt: String!
    dayName: String!
  }
`;
