import { getResolversFromSchema } from "@graphql-tools/utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    exitGroup: async (_, { groupId, memberId }, { client, loggedInUser }) => {
      const group = await client.group.findFirst({
        where: {
          id: groupId,
        },
        include: {
          inviter: true,
        },
      });
      console.log("inviter:", group.inviterId);
      console.log("mem:", memberId);
      if (group.inviter.userId === memberId) {
        const isDeleted = await client.group.delete({
          where: {
            id: groupId,
          },
        });
        if (isDeleted) {
          return {
            ok: true,
          };
        }
        return {
          ok: false,
          error: "그룹을 삭제할 수 없습니다.",
        };
      } else {
        const isExited = await client.group.update({
          where: {
            id: groupId,
          },
          data: {
            members: {
              disconnect: {
                id: memberId,
              },
            },
          },
        });
        if (isExited) {
          return {
            ok: true,
          };
        }
        return {
          ok: false,
          error: "그룹에서 퇴장할 수 없습니다.",
        };
      }
    },
  },
};

export default resolvers;
