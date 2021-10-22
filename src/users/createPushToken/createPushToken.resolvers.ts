import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createPushToken: securedResolver(
      async (_, { pushToken }, { client, loggedInUser }) => {
        const isCreated = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            pushToken,
          },
        });
        if (isCreated) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "푸쉬토큰이 만들어지지 않았습니다.",
          };
        }
      }
    ),
  },
};

export default resolvers;
