import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeTime: async (_, { day }, { client, loggedInUser }) => {
      const time = await client.time.findFirst({
        where: {
          userId: loggedInUser.id,
          updatedAt: day,
        },
      });
      return time;
    },
  },
};

export default resolvers;
