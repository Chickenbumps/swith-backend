"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Group {\n    id: Int!\n    title: String!\n    description: String\n    members: [User]!\n    messages: [Message]\n    unreadMessage: Int!\n    inviter: Inviter\n    groupAvatar: String\n    memberNum: Int\n    createdAt: String!\n    updatedAt: String!\n  }\n\n  type Message {\n    id: Int!\n    payload: String!\n    user: User!\n    group: Group!\n    createdAt: String!\n    updatedAt: String!\n    read: Boolean\n  }\n\n  type Inviter {\n    id: Int!\n    user: User!\n    Group: [Group]\n  }\n"], ["\n  type Group {\n    id: Int!\n    title: String!\n    description: String\n    members: [User]!\n    messages: [Message]\n    unreadMessage: Int!\n    inviter: Inviter\n    groupAvatar: String\n    memberNum: Int\n    createdAt: String!\n    updatedAt: String!\n  }\n\n  type Message {\n    id: Int!\n    payload: String!\n    user: User!\n    group: Group!\n    createdAt: String!\n    updatedAt: String!\n    read: Boolean\n  }\n\n  type Inviter {\n    id: Int!\n    user: User!\n    Group: [Group]\n  }\n"])));
var templateObject_1;
