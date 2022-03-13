import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    searchGroups: securedResolver(
      async (_, { title }, { client, loggedInUser }) => {
        const groups = await client.group.findMany({
          where: {
            title: {
              contains: title.toLowerCase(),
              mode: "insensitive",
            },
          },
        });
        return groups;
      }
    ),
  },
};

export default resolvers;
