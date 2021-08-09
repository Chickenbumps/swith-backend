require("dotenv").config();

import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { schema } from "./schema";

const PORT = process.env.PORT;

(async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    context: async (context) => {
      return {
        loggedInUser: await getUser(context.req.headers.token),
        client: client,
      };
    },
  });
  await server.start();
  app.use(logger("dev"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ token }, webSocket, context) => {
        if (!token) {
          throw new Error("유효하지 않은 토큰입니다. subscription error.");
        }
        const loggedInUser = await getUser(token);
        return {
          loggedInUser,
          client: client,
        };
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  httpServer.listen({ port: PORT }, () => {
    console.log(`🌏Server is now running on http://localhost:${PORT}/graphql`);
  });
})();
