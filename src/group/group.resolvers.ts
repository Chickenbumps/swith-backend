import { IdentityStore } from "aws-sdk";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Message: {
    user: ({ id }, _, { client }) =>
      client.message
        .findUnique({
          where: {
            id,
          },
        })
        .user(),
  },
  Group: {
    messages: ({ id }, _, { client }) =>
      client.group
        .findUnique({
          where: {
            id,
          },
        })
        .messages(),
    members: ({ id }, _, { client }) =>
      client.group
        .findUnique({
          where: {
            id,
          },
        })
        .members(),
    unreadMessage: ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          groupId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
    inviter: async ({ id }, _, { client, loggedInUser }) => {
      const inviterInfo = await client.group
        .findFirst({
          where: {
            id,
          },
        })
        .inviter();
      const inviter = await client.inviter.findFirst({
        where: {
          id: inviterInfo.id,
        },
        include: {
          user: true,
        },
      });
      console.log(inviter);
      return inviter;
    },
  },
};

export default resolvers;