import { PrismaClient, User } from "@prisma/client";

export type Resolver = (root: any, args: any, context: any, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

export type SubResolvers = {
  [key: string]: {
    [key: string]: {
      [key: string]: Resolver;
    };
  };
};
