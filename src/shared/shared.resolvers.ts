import { Resolvers } from "../types";
import { GraphQLUpload } from "graphql-upload";

import { GraphQLDateTime } from "graphql-iso-date";
const resolvers = {
  Upload: GraphQLUpload,
  DateTime: GraphQLDateTime,
};

export default resolvers;
