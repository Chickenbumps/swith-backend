import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: securedResolver(
      async (
        _,
        { name, username, password, bio, avatar },
        { loggedInUser, client }
      ) => {
        // avatar edit
        let newAvatarUri = null;
        if (avatar) {
          newAvatarUri = await uploadToS3(avatar, loggedInUser.id, "avatar");
        }

        let newEncryptedPassword = null;
        if (password) {
          newEncryptedPassword = await bcrypt.hash(password, 10);
        }
        const editedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            name,
            username,
            ...(newEncryptedPassword && { password: newEncryptedPassword }),
            bio,
            ...(newAvatarUri && { avatar: newAvatarUri }),
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
