import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";
import moment from "moment";

const resolvers: Resolvers = {
  Query: {
    isMe: securedResolver(async (_, __, { client, loggedInUser }) => {
      const me = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
        },
        include: {
          time: true,
          observers: true,
        },
      });
      // console.log(me.updatedAt, moment().format());
      // console.log(me.updatedAt.toISOString().slice(8, 10), moment().date());
      const meDate = me.updatedAt.slice(9, 10);
      // console.log("isMe:", meDate, moment().date());
      if (meDate !== moment().date().toString()) {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            todayTime: 0,
            updatedAt: moment().format(),
          },
        });
      }
      return me;
    }),
  },
};
export default resolvers;
