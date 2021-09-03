import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeGroups: securedResolver(async (_, __, { client, loggedInUser }) => {
      const groups = await client.group.findMany({
        where: {
          members: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include: {
          members: {
            orderBy: {
              username: "asc",
            },
            include: {
              observers: true,
            },
          },
        },
      });
      console.log(groups[0].members);
      return groups;
    }),
  },
};

export default resolvers;
