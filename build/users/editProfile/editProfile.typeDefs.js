"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
exports["default"] = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type EditProfileResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editProfile(\n      name: String\n      username: String\n      password: String\n      bio: String\n      avatar: Upload\n    ): EditProfileResult!\n  }\n"], ["\n  type EditProfileResult {\n    ok: Boolean!\n    error: String\n  }\n  type Mutation {\n    editProfile(\n      name: String\n      username: String\n      password: String\n      bio: String\n      avatar: Upload\n    ): EditProfileResult!\n  }\n"])));
var templateObject_1;
