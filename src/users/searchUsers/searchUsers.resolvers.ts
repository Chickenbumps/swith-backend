import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page }, { client }) => {
      const take = 3;
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: take,
        skip: (page - 1) * 3,
      });
      const searchNumber = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return {
        users,
        totalPages: Math.ceil(searchNumber / take),
      };
    },
  },
};

export default resolvers;
