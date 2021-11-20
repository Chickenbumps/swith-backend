import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followToggle: securedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const targetUser = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!targetUser) {
          return {
            ok: false,
            error: "존재하지 않는 유저 입니다.",
          };
        }
        const me = await client.user.findFirst({
          where: {
            id: loggedInUser.id,
          },
          include: {
            following: true,
          },
        });
        const isFollowing = me.following.filter(
          (item) => item.id === targetUser.id
        );

        console.log("isFollowing:", isFollowing);
        if (isFollowing.length === 0) {
          console.log("!isFollow");
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                connect: {
                  username,
                },
              },
              updatedAt: moment().format(),
            },
          });
          return {
            ok: true,
            result: "followed",
          };
        } else {
          console.log("isFollow");
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
              updatedAt: moment().format(),
            },
          });
          return {
            ok: true,
            result: "unfollowed",
          };
        }
      }
    ),
  },
};

export default resolvers;
