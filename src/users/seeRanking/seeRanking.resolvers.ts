import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeRanking: async (
      _,
      { rank, todayTime, weekTime, monthTime, totalTime },
      { client, loggedInUser }
    ) => {
      let users;
      if (todayTime) {
        users = await client.user.findMany({
          where: {
            id: {
              gte: 0,
            },
          },
          select: {
            id: true,
            avatar: true,
            username: true,
            rank: true,
            todayTime: true,
            weekTime: true,
            monthTime: true,
            totalTime: true,
          },
          orderBy: {
            todayTime: "desc",
          },
        });
      } else if (weekTime) {
        users = await client.user.findMany({
          where: {
            id: {
              gte: 0,
            },
          },
          select: {
            id: true,
            avatar: true,
            username: true,
            rank: true,
            todayTime: true,
            weekTime: true,
            monthTime: true,
            totalTime: true,
          },
          orderBy: {
            weekTime: "desc",
          },
        });
      } else if (monthTime) {
        users = await client.user.findMany({
          where: {
            id: {
              gte: 0,
            },
          },
          select: {
            id: true,
            avatar: true,
            username: true,
            rank: true,
            todayTime: true,
            weekTime: true,
            monthTime: true,
            totalTime: true,
          },
          orderBy: {
            monthTime: "desc",
          },
        });
      } else if (totalTime) {
        users = await client.user.findMany({
          where: {
            id: {
              gte: 0,
            },
          },
          select: {
            id: true,
            avatar: true,
            username: true,
            rank: true,
            todayTime: true,
            weekTime: true,
            monthTime: true,
            totalTime: true,
          },
          orderBy: {
            totalTime: "desc",
          },
        });
      }
      return users;
    },
  },
};

export default resolvers;
