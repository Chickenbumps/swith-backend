import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      // const exists = await client.user
      //   .findUnique({ where: { username: loggedInUser.username } })
      //   .following({
      //     where: {
      //       id,
      //     },
      //   });
      // return exists.length !== 0;
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    timePerNumber: ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return (loggedInUser.totalTime / loggedInUser.totalNumberOfTime).toFixed(
        2
      );
    },
    numberPerTime: ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return (loggedInUser.totalNumberOfTime / loggedInUser.totalTime).toFixed(
        2
      );
    },
  },
};

export default resolvers;
