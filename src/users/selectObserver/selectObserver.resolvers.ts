import { currentTime } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    selectObserver: securedResolver(
      async (_, { groupId, username }, { client, loggedInUser }) => {
        const group = await client.group.findFirst({
          where: {
            id: groupId,
            members: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          include: {
            members: {
              where: {
                NOT: {
                  id: loggedInUser.id,
                },
                AND: {
                  username: username,
                },
              },
            },
          },
        });
        if (!group.members.length) {
          return {
            ok: false,
            error: "그룹에 없는 멤버입니다.감시자로 선택할 수 없습니다.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            observer: {
              connectOrCreate: {
                create: {
                  userId: group.members[0].id,
                },
                where: {
                  id: group.members[0].id,
                },
              },
            },
            updatedAt: currentTime(),
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
