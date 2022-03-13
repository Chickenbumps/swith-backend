import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

// 사실상 seeMessage
const resolvers: Resolvers = {
  Query: {
    seeGroup: securedResolver(
      async (_, { id, offset }, { client, loggedInUser }) => {
        const group = await client.group.findFirst({
          where: {
            id,
            members: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            inviter: true,
            members: true,
            messages: {
              skip: offset,
              take: 10,
              orderBy: {
                createdAt: "desc",
              },
            },
            groupAvatar: true,
          },
        });

        const unreadMessagesIds = group.messages
          .filter((item) => item.read === false)
          .map((item) => item.id);

        await client.message.updateMany({
          where: {
            id: {
              in: unreadMessagesIds,
            },
          },
          data: {
            read: true,
          },
        });
        // console.log(group.messages);
        return group;
      }
    ),
  },
};

export default resolvers;
