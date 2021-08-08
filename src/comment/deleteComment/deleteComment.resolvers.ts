import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: securedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const isMine = await client.comment.findFirst({
          where: {
            AND: [{ id: id }, { userId: loggedInUser.id }],
          },
          select: {
            id: true,
          },
        });
        console.log(isMine);
        if (!isMine) {
          return {
            ok: false,
            error: "코멘트 작성자가 아닙니다. 코멘트를 삭제할 수 없습니다.",
          };
        }
        const deleteComment = await client.comment.delete({
          where: {
            id: id,
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
