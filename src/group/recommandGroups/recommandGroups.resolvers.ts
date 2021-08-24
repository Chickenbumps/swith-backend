import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    recommandGroups: (_, __, { client }) => {
      return client.group.findMany({
        take: 5,
      });
    },
  },
};

export default resolvers;
