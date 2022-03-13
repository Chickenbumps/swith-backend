"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type ExitGroupResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    exitGroup(groupId: Int!, memberId: Int!): ExitGroupResult!\n  }\n"], ["\n  type ExitGroupResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    exitGroup(groupId: Int!, memberId: Int!): ExitGroupResult!\n  }\n"])));
var templateObject_1;
