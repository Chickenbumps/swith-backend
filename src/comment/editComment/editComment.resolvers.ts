import { makeDocument } from "@prisma/client/runtime";
import { time } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editComment: securedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment = await client.comment.findFirst({
          where: {
            id,
            user: {
              id: loggedInUser.id,
            },
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "권한이 없습니다.코멘트를 삭제할 수 없습니다.",
          };
        }

        await client.comment.update({
          where: {
            id,
          },
          data: {
            payload,
            updatedAt: time(),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
