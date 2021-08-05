import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: securedResolver(
      async (
        _,
        { firstName, lastName, username, password, bio, avatar },
        { loggedInUser, client }
      ) => {
        // avatar edit
        let newAvatarUri = null;
        if (avatar) {
          newAvatarUri = await uploadToS3(avatar, loggedInUser.id, "avatar");
        }

        let newEncryptedPassword = null;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const newEncryptedPassword = await bcrypt.hash(password, salt);
        }

        const editedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            password: newEncryptedPassword ?? password,
            bio,
            avatar: newAvatarUri ?? avatar,
          },
        });
        if (editedUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "사용자 정보를 변경하는데 실패 하였습니다.",
          };
        }
      }
    ),
  },
};

export default resolvers;
