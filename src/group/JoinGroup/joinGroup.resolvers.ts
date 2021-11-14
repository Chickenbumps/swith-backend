import { securedResolver } from "./../../users/users.utils";
import moment from "moment";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    joinGroup: securedResolver(
      async (_, { groupId }, { client, loggedInUser }) => {
        console.log(groupId);
        const isOk = await client.group.update({
          where: {
            id: groupId,
          },
          data: {
            members: {
              connect: {
                id: loggedInUser.id,
              },
            },
            updatedAt: moment().format(),
          },
        });
        console.log(isOk);
        if (isOk) {
          return {
            ok: true,
          };
        }
        return {
          ok: false,
          erorr: "해당그룹에 입장 할 수 없습니다.",
        };
      }
    ),
  },
};

export default resolvers;
