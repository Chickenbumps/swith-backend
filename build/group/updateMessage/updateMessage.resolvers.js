"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pubsub_1 = __importDefault(require("../../pubsub"));
var variables_1 = require("../../variables");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var resolvers = {
    Subscription: {
        updateMessage: {
            subscribe: function (_, _a, _b) {
                var groupId = _a.groupId;
                var client = _b.client, loggedInUser = _b.loggedInUser;
                return __awaiter(void 0, void 0, void 0, function () {
                    var group;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, client.group.findFirst({
                                    where: {
                                        id: groupId,
                                        members: {
                                            some: {
                                                id: loggedInUser.id
                                            }
                                        }
                                    },
                                    select: {
                                        id: true
                                    }
                                })];
                            case 1:
                                group = _c.sent();
                                if (!group) {
                                    // throw new Error("그룹의 멤버가 아닙니다.");
                                    // console.log("그룹의 멤버가 아닙니다.");
                                }
                                return [2 /*return*/, graphql_subscriptions_1.withFilter(function () { return pubsub_1["default"].asyncIterator(variables_1.NEW_MESSAGE); }, function (root, _a, _b) {
                                        var groupId = _a.groupId;
                                        var client = _b.client, loggedInUser = _b.loggedInUser;
                                        return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_c) {
                                                return [2 /*return*/, root.updateMessage.groupId === groupId];
                                            });
                                        });
                                    })(_, { groupId: groupId }, { client: client, loggedInUser: loggedInUser })];
                        }
                    });
                });
            }
        }
    }
};
exports["default"] = resolvers;
