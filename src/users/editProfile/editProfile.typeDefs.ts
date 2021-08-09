import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      username: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResult!
  }
`;
