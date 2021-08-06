import { gql } from "apollo-server-express";

export default gql`
  type SearchUsersResult {
    users: [User]!
    totalPages: Int!
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): SearchUsersResult
  }
`;
