import { gql } from "apollo-server-express";

export default gql`
  type UpdateGroupResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateGroup(
      groupId: Int!
      title: String
      description: String
      inviteeName: String
    ): UpdateGroupResult!
  }
`;
