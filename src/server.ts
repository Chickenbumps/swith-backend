require("dotenv").config();

import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client: client,
      };
    },
  });
  await server.start();
  app.use(logger("dev"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () => {
    console.log(`🌏Server is running on http://localhost:${PORT}/`);
  });
}

startServer();
