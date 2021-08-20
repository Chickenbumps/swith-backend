import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: securedResolver(
      async (_, { payload }, { client, loggedInUser }) => {
        if (!payload) {
          return {
            ok: false,
            error: "내용을 입력해주세요.",
          };
        }
        const comment = await client.comment.create({
          data: {
            payload: payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            createdAt: moment().format("YYYY-MM-DD"),
            updatedAt: moment().format("YYYY-MM-DD"),
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "코멘트 작성에 실패했습니다.",
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
