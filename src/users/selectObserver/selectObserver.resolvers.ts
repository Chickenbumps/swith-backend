import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    selectObserver: securedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const user = await client.user.findFirst({
          where: {
            username,
          },
        });
        const isObserver = await client.user
          .findFirst({
            where: {
              id: loggedInUser.id,
            },
          })
          .observers();
        const alreadyObserver = isObserver.find(
          (observer) => observer.username === username
        );
        if (alreadyObserver) {
          const isDisconnect = await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              observers: {
                disconnect: {
                  username,
                },
              },
            },
          });
          if (!isDisconnect) {
            return {
              ok: false,
              error: "옵저버 해제를 실패했습니다.",
            };
          }
          return {
            ok: true,
            user,
          };
        }
        const isOk = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            observers: {
              connect: {
                username,
              },
            },
          },
        });

        if (!isOk) {
          return {
            ok: false,
            error: "옵저버 선택을 실패했습니다.",
          };
        }
        return {
          ok: true,
          user,
        };
      }
    ),
  },
};

export default resolvers;
