import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    searchGroups: securedResolver((_, { title }, { client, loggedInUser }) =>
      client.group.findMany({
        where: {
          title: {
            contains: title.toLowerCase(),
          },
        },
      })
    ),
  },
};

export default resolvers;
