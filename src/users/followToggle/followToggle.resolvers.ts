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
        const isFollowing = await (
          await client.user
            .findUnique({
              where: {
                id: loggedInUser.id,
              },
            })
            .following()
        ).map((user) => user.id === targetUser.id);
        console.log(isFollowing);
        if (!isFollowing.length) {
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
            },
          });
          return {
            ok: true,
            result: "followed",
          };
        }
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
          },
        });
        return {
          ok: true,
          result: "unfollowed",
        };
      }
    ),
  },
};

export default resolvers;
