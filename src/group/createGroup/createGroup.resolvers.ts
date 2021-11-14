import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createGroup: securedResolver(
      async (_, { title, description }, { client, loggedInUser }) => {
        console.log(moment().format());
        const alreadyInviter = await client.inviter.findFirst({
          where: {
            userId: loggedInUser.id,
          },
        });
        let inviter = alreadyInviter;
        if (!alreadyInviter) {
          inviter = await client.inviter.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        }
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
              connect: {
                id: inviter.id,
              },
            },
            groupAvatar:
              "https://swith-upload.s3.ap-northeast-2.amazonaws.com/avatar/logo.png",
            createdAt: moment().format(),
            updatedAt: moment().format(),
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

// connectOrCreate: {
//   create: {
//     userId: loggedInUser.id,
//   },
//   where: {
//     id: loggedInUser.id,
//   },
// },
