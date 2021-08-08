import { gql } from "apollo-server";

export default gql`
  scalar Upload
  scalar DateTime
  type MutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
