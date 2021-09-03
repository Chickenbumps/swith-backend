import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeGroup: securedResolver(
      async (_, { id, offset }, { client, loggedInUser }) => {
        console.log(offset);
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
          },
        });
        return group;
      }
    ),
  },
};

export default resolvers;
