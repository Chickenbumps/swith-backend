import client from "../../client";
import { currentTime } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    isMe: securedResolver(async (_, __, { client, loggedInUser }) => {
      const me = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
      const today = currentTime().getDay();
      if (me.updatedAt.getDay() !== today) {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            todayTime: 0,
            updatedAt: currentTime(),
          },
        });
      }
      return me;
    }),
  },
};
export default resolvers;
