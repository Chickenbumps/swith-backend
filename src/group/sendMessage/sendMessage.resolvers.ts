import pubsub from "../../pubsub";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../variables";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: securedResolver(
      async (_, { payload, groupId }, { client, loggedInUser }) => {
        // 그룹찾고, 메시지 모두 한테 보내기
        const group = await client.group.findUnique({
          where: {
            id: groupId,
          },
          include: {
            members: true,
          },
        });
        if (!group) {
          return {
            ok: false,
            error: "메시지를 보낼 수 없습니다. 없는 그룹입니다.",
          };
        }
        const isMember = group.members.find(
          (member) => member.id === loggedInUser.id
        );
        if (!isMember) {
          return {
            ok: false,
            error: "메시지를 보낼 수 없습니다. 그룹에 속한 멤버가 아닙니다.",
          };
        }

        const message = await client.message.create({
          data: {
            payload,
            group: {
              connect: {
                id: groupId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        pubsub.publish(NEW_MESSAGE, { updateMessage: { ...message } });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
