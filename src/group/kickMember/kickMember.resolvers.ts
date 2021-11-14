import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    kickMember: securedResolver(
      async (_, { groupId, memberId }, { client, loggedInUser }) => {
        const isIviter = await client.inviter.findFirst({
          where: {
            userId: loggedInUser.id,
            Group: {
              some: {
                id: groupId,
              },
            },
          },
        });
        if (!isIviter) {
          return {
            ok: false,
            error: "추방 권한이 없습니다.",
          };
        }
        const isMember = await client.group.findFirst({
          where: {
            id: groupId,
            members: {
              some: {
                id: memberId,
              },
            },
          },
        });
        if (!isMember) {
          return {
            ok: false,
            error: "존재하지 않는 멤버입니다.",
          };
        }
        await client.group.update({
          where: {
            id: groupId,
          },
          data: {
            members: {
              disconnect: {
                id: memberId,
              },
            },
            updatedAt: moment().format(),
          },
        });
        return {
          ok: true,
          kickedUserId: memberId,
        };
      }
    ),
  },
};

export default resolvers;
