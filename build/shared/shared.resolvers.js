"use strict";
exports.__esModule = true;
var graphql_upload_1 = require("graphql-upload");
var graphql_iso_date_1 = require("graphql-iso-date");
var resolvers = {
    Upload: graphql_upload_1.GraphQLUpload,
    DateTime: graphql_iso_date_1.GraphQLDateTime
};
exports["default"] = resolvers;
