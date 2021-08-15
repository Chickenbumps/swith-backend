import { currentTime } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    readMessage: securedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const readMessage = client.message.update({
          where: {
            id,
          },
          data: {
            read: true,
            updatedAt: currentTime(),
          },
        });
        if (!readMessage) {
          return {
            ok: false,
            error: "메시지가 존재하지 않습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
