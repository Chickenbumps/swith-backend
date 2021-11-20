import { gql } from "apollo-server-express";

export default gql`
  type CreateCommentResult {
    ok: Boolean!
    commentId: Int!
    error: String
  }
  type Mutation {
    createComment(payload: String!, range: String!): CreateCommentResult!
  }
`;
