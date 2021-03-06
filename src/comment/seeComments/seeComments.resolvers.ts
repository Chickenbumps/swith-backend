import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeComments: securedResolver(
      async (_, { userId, offset }, { client, loggedInUser }) => {
        const comments = await client.comment.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
          },
          skip: offset,
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        });

        return comments;
      }
    ),
  },
};

export default resolvers;
