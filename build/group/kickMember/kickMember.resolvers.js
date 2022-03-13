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
var expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
var moment_1 = __importDefault(require("moment"));
var users_utils_1 = require("../../users/users.utils");
var resolvers = {
    Mutation: {
        kickMember: users_utils_1.securedResolver(function (_, _a, _b) {
            var groupId = _a.groupId, memberId = _a.memberId;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return __awaiter(void 0, void 0, void 0, function () {
                var isIviter, isMember, isKicked, expo, messages, token, chunks, tickets, _i, chunks_1, chunk, ticketChunk, error_1, receiptIds, _c, tickets_1, ticket, receiptIdChunks, _d, receiptIdChunks_1, chunk, receipts, receiptId, _e, status, details, message, error_2;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, client.inviter.findFirst({
                                where: {
                                    userId: loggedInUser.id,
                                    Group: {
                                        some: {
                                            id: groupId
                                        }
                                    }
                                }
                            })];
                        case 1:
                            isIviter = _f.sent();
                            if (!isIviter) {
                                return [2 /*return*/, {
                                        ok: false,
                                        error: "추방 권한이 없습니다."
                                    }];
                            }
                            return [4 /*yield*/, client.group.findFirst({
                                    where: {
                                        id: groupId,
                                        members: {
                                            some: {
                                                id: memberId
                                            }
                                        }
                                    }
                                })];
                        case 2:
                            isMember = _f.sent();
                            if (!isMember) {
                                return [2 /*return*/, {
                                        ok: false,
                                        error: "존재하지 않는 멤버입니다."
                                    }];
                            }
                            return [4 /*yield*/, client.group.update({
                                    where: {
                                        id: groupId
                                    },
                                    data: {
                                        members: {
                                            disconnect: {
                                                id: memberId
                                            }
                                        },
                                        updatedAt: moment_1["default"]().format()
                                    }
                                })];
                        case 3:
                            isKicked = _f.sent();
                            expo = new expo_server_sdk_1["default"]();
                            messages = [];
                            return [4 /*yield*/, client.user.findFirst({
                                    where: {
                                        id: memberId
                                    },
                                    select: {
                                        pushToken: true
                                    }
                                })];
                        case 4:
                            token = _f.sent();
                            if (!isKicked) return [3 /*break*/, 16];
                            if (!expo_server_sdk_1["default"].isExpoPushToken(token.pushToken)) {
                                console.error("Push token " + token + " is not a valid Expo push token.");
                            }
                            messages.push({
                                to: token.pushToken,
                                sound: "default",
                                body: "\uADF8\uB8F9 " + isMember.title + "\uC5D0\uC11C \uCD94\uBC29\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
                                data: {
                                    withSOme: "data",
                                    experienceId: "@username/example",
                                    tag: "" + loggedInUser.id
                                }
                            });
                            chunks = expo.chunkPushNotifications(messages);
                            tickets = [];
                            _i = 0, chunks_1 = chunks;
                            _f.label = 5;
                        case 5:
                            if (!(_i < chunks_1.length)) return [3 /*break*/, 10];
                            chunk = chunks_1[_i];
                            _f.label = 6;
                        case 6:
                            _f.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, expo.sendPushNotificationsAsync(chunk)];
                        case 7:
                            ticketChunk = _f.sent();
                            tickets.push.apply(tickets, ticketChunk);
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _f.sent();
                            console.error("Push Notification Error:" + error_1);
                            return [3 /*break*/, 9];
                        case 9:
                            _i++;
                            return [3 /*break*/, 5];
                        case 10:
                            receiptIds = [];
                            for (_c = 0, tickets_1 = tickets; _c < tickets_1.length; _c++) {
                                ticket = tickets_1[_c];
                                if (ticket.id) {
                                    receiptIds.push(ticket.id);
                                }
                            }
                            receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                            _d = 0, receiptIdChunks_1 = receiptIdChunks;
                            _f.label = 11;
                        case 11:
                            if (!(_d < receiptIdChunks_1.length)) return [3 /*break*/, 16];
                            chunk = receiptIdChunks_1[_d];
                            _f.label = 12;
                        case 12:
                            _f.trys.push([12, 14, , 15]);
                            return [4 /*yield*/, expo.getPushNotificationReceiptsAsync(chunk)];
                        case 13:
                            receipts = _f.sent();
                            for (receiptId in receipts) {
                                _e = receipts[receiptId], status = _e.status, details = _e.details;
                                if (status === "ok") {
                                    continue;
                                }
                                else if (status === "error") {
                                    message = receipts[receiptId].message;
                                    console.error("There was an error sending a notification: " + message);
                                    if (details && details.error) {
                                        console.error("The error code is " + details.error);
                                    }
                                }
                            }
                            return [3 /*break*/, 15];
                        case 14:
                            error_2 = _f.sent();
                            console.error(error_2);
                            return [3 /*break*/, 15];
                        case 15:
                            _d++;
                            return [3 /*break*/, 11];
                        case 16: return [2 /*return*/, {
                                ok: true,
                                kickedUserId: memberId,
                                message: messages
                            }];
                    }
                });
            });
        })
    }
};
exports["default"] = resolvers;
