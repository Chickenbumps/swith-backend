import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeGroupInfo: (_, { id }, { client, loggedInUser }) => {
      return client.group.findFirst({
        where: {
          id,
        },
        include: {
          members: true,
        },
      });
    },
  },
};

export default resolvers;
