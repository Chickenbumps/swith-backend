import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client, loggedInUser }) => {
      const searchUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!searchUser) {
        return null;
      }
      return searchUser;
    },
  },
};

export default resolvers;
