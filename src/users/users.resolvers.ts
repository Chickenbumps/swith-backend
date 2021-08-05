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
    rank: (_, __, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return null;
      }
      if (loggedInUser.exp === loggedInUser.maxExp) {
        if (loggedInUser.rank === "Bronze") {
          loggedInUser.exp = 0;
          loggedInUser.maxExp = 50;
          return "Silver";
        } else if (loggedInUser.rank === "Silver") {
          loggedInUser.exp = 0;
          loggedInUser.maxExp = 100;
          return "Gold";
        } else if (loggedInUser.rank === "Gold") {
          loggedInUser.exp = 0;
          loggedInUser.maxExp = 200;
        }
      }
    },
  },
};

export default resolvers;
