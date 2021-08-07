import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeGroups: securedResolver((_, __, { client, loggedInUser }) =>
      client.group.findMany({
        where: {
          members: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};

export default resolvers;
