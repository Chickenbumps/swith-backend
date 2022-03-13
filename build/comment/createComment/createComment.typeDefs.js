"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CreateCommentResult {\n    ok: Boolean!\n    commentId: Int!\n    error: String\n  }\n  type Mutation {\n    createComment(payload: String!, range: String!): CreateCommentResult!\n  }\n"], ["\n  type CreateCommentResult {\n    ok: Boolean!\n    commentId: Int!\n    error: String\n  }\n  type Mutation {\n    createComment(payload: String!, range: String!): CreateCommentResult!\n  }\n"])));
var templateObject_1;
