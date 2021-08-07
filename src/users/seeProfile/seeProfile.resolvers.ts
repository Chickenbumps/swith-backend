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
        console.log("존재하지 않는 유저 입니다.");
        return null;
      }
      return searchUser;
    },
  },
};

export default resolvers;