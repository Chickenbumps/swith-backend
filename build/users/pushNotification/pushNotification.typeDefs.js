"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_core_1 = require("apollo-server-core");
exports["default"] = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type PushNotificationResult {\n    ok: Boolean!\n    message: ObjectScalarType\n    error: String\n  }\n\n  type Mutation {\n    pushNotification(username: String): PushNotificationResult!\n  }\n"], ["\n  type PushNotificationResult {\n    ok: Boolean!\n    message: ObjectScalarType\n    error: String\n  }\n\n  type Mutation {\n    pushNotification(username: String): PushNotificationResult!\n  }\n"])));
var templateObject_1;
