"use strict";
exports.__esModule = true;
exports.schema = exports.resolvers = exports.typeDefs = void 0;
var load_files_1 = require("@graphql-tools/load-files");
var merge_1 = require("@graphql-tools/merge");
var schema_1 = require("@graphql-tools/schema");
var loadedTypes = load_files_1.loadFilesSync(__dirname + "/**/*.typeDefs.*");
var loadedResolvers = load_files_1.loadFilesSync(__dirname + "/**/*.resolvers.*");
exports.typeDefs = merge_1.mergeTypeDefs(loadedTypes);
exports.resolvers = merge_1.mergeResolvers(loadedResolvers);
exports.schema = schema_1.makeExecutableSchema({
    typeDefs: exports.typeDefs,
    resolvers: exports.resolvers
});
