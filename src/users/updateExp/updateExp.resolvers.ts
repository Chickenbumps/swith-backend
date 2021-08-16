import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    updateExp: securedResolver(async (_, { exp }, { client, loggedInUser }) => {
      const user = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          exp: exp + loggedInUser.exp,
          updatedAt: moment().format(),
        },
      });

      let newRank = null;
      let newMaxExp = null;
      if (user.exp >= user.maxExp) {
        if (user.rank === "Bronze") {
          newRank = "Silver";
          newMaxExp = 50;
        } else if (user.rank === "Silver") {
          newRank = "Gold";
          newMaxExp = 150;
        } else if (user.rank === "Gold") {
          newRank = "Platinum";
          newMaxExp = 300;
        }
      }
      if (newRank && newMaxExp) {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            exp: user.exp - user.maxExp,
            maxExp: newMaxExp,
            rank: newRank,
          },
        });
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: "랭크정보를 업데이트 할 수 없습니다.",
      };
    }),
  },
};

export default resolvers;
