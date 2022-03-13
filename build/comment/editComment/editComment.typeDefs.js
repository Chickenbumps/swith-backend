"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type EditCommentResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editComment(id: Int!, payload: String!, range: String!): EditCommentResult!\n  }\n"], ["\n  type EditCommentResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editComment(id: Int!, payload: String!, range: String!): EditCommentResult!\n  }\n"])));
var templateObject_1;
