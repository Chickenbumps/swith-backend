import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeMessage: securedResolver(
      async (_, { groupId, offset }, { client, loggedInUser }) => {
        const message = await client.message.findMany({
          where: {
            groupId: groupId,
            group: {
              members: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: offset,
          take: 10,
        });
        return message;
      }
    ),
  },
};

export default resolvers;
