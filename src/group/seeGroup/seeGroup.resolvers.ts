import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeGroup: securedResolver(async (_, { id }, { client, loggedInUser }) => {
      const group = await client.group.findFirst({
        where: {
          id,
          members: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      return group;
    }),
  },
};

export default resolvers;
