import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeTimes: securedResolver(
      async (_, { to, from }, { client, loggedInUser }) => {
        // console.log(to, from);
        const timeArray = await client.time.findMany({
          where: {
            userId: loggedInUser.id,
            AND: [
              {
                updatedAt: {
                  gte: to,
                },
              },
              {
                updatedAt: {
                  lte: from,
                },
              },
            ],
          },
          orderBy: {
            updatedAt: "asc",
          },
        });
        // console.log(timeArray);
        return timeArray;
      }
    ),
  },
};

export default resolvers;
