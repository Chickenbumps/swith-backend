import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createGroup: securedResolver(
      async (_, { title, description }, { client, loggedInUser }) => {
        const group = await client.group.create({
          data: {
            title: title,
            description: description ?? "환영합니다.",
            members: {
              connect: {
                id: loggedInUser.id,
              },
            },
            inviter: {
              connectOrCreate: {
                create: {
                  userId: loggedInUser.id,
                },
                where: {
                  id: loggedInUser.id,
                },
              },
            },
          },
        });
        if (group) {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
