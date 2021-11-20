import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editComment: securedResolver(
      async (_, { id, payload, range }, { client, loggedInUser }) => {
        if (!payload) {
          return {
            ok: false,
            error: "내용을 입력해주세요.",
          };
        }
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
            updatedAt: moment().format(),
            range,
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
