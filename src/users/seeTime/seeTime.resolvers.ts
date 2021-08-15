import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeTime: (_, { day }, { client, loggedInUser }) => {
      client.time.findFirst({
        where: {
          userId: loggedInUser.id,
        },
      });
    },
  },
};

export default resolvers;
