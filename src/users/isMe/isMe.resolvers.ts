import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";
import moment from "moment";
const resolvers: Resolvers = {
  Query: {
    isMe: securedResolver(async (_, __, { client, loggedInUser }) => {
      const me = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
      // console.log(me.updatedAt, moment().format());
      // console.log(me.updatedAt.getDay(), moment().day());
      if (me.updatedAt.getDay() !== moment().day()) {
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
