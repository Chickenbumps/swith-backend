"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ObjectScalarType = void 0;
var apollo_server_1 = require("apollo-server");
var graphql_1 = require("graphql");
exports["default"] = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar Upload\n  scalar DateTime\n  scalar ObjectScalarType\n  type MutationResponse {\n    ok: Boolean!\n    id: Int\n    error: String\n  }\n"], ["\n  scalar Upload\n  scalar DateTime\n  scalar ObjectScalarType\n  type MutationResponse {\n    ok: Boolean!\n    id: Int\n    error: String\n  }\n"])));
exports.ObjectScalarType = new graphql_1.GraphQLScalarType({
    name: "Object",
    description: "Arbitrary object",
    parseValue: function (value) {
        return typeof value === "object"
            ? value
            : typeof value === "string"
                ? JSON.parse(value)
                : null;
    },
    serialize: function (value) {
        return typeof value === "object"
            ? value
            : typeof value === "string"
                ? JSON.parse(value)
                : null;
    },
    parseLiteral: function (ast) {
        switch (ast.kind) {
            case graphql_1.Kind.STRING:
                return JSON.parse(ast.value);
            case graphql_1.Kind.OBJECT:
                throw new Error("Not sure what to do with OBJECT for ObjectScalarType");
            default:
                return null;
        }
    }
});
var templateObject_1;
