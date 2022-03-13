"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_core_1 = require("apollo-server-core");
exports["default"] = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    seeRanking(\n      rank: Boolean\n      todayTime: Boolean\n      weekTime: Boolean\n      monthTime: Boolean\n      totalTime: Boolean\n    ): [User]!\n  }\n"], ["\n  type Query {\n    seeRanking(\n      rank: Boolean\n      todayTime: Boolean\n      weekTime: Boolean\n      monthTime: Boolean\n      totalTime: Boolean\n    ): [User]!\n  }\n"])));
var templateObject_1;
