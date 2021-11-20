import pubsub from "../../pubsub";
import { SubResolvers } from "../../types";
import { NEW_MESSAGE } from "../../variables";
import { withFilter } from "graphql-subscriptions";

const resolvers: SubResolvers = {
  Subscription: {
    updateMessage: {
      subscribe: async (_, { groupId }, { client, loggedInUser }) => {
        const group = await client.group.findFirst({
          where: {
            id: groupId,
            members: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!group) {
          // throw new Error("그룹의 멤버가 아닙니다.");
          console.log("그룹의 멤버가 아닙니다.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async (root, { groupId }, { client, loggedInUser }) => {
            return root.updateMessage.groupId === groupId;
          }
        )(_, { groupId }, { client, loggedInUser });
      },
    },
  },
};

export default resolvers;
