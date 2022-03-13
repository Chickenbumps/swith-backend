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
exports.__esModule = true;
var expo_server_sdk_1 = require("expo-server-sdk");
var resolvers = {
    Mutation: {
        pushNotification: function (_, _a, _b) {
            var username = _a.username;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return __awaiter(void 0, void 0, void 0, function () {
                var expo, messages, isObserver, tokens, _i, tokens_1, pushToken, chunks, tickets, _c, chunks_1, chunk, ticketChunk, error_1, receiptIds, _d, tickets_1, ticket, receiptIdChunks, _e, receiptIdChunks_1, chunk, receipts, receiptId, _f, status, details, message, error_2;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            expo = new expo_server_sdk_1.Expo();
                            messages = [];
                            return [4 /*yield*/, client.user.findFirst({
                                    where: {
                                        username: username
                                    },
                                    select: {
                                        observers: true,
                                        name: true
                                    }
                                })];
                        case 1:
                            isObserver = _g.sent();
                            if (!isObserver) {
                                return [2 /*return*/, {
                                        ok: false,
                                        error: "설정된 감시자가 없습니다."
                                    }];
                            }
                            tokens = isObserver.observers.map(function (item) { return item.pushToken; });
                            for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                                pushToken = tokens_1[_i];
                                if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
                                    console.error("Push token " + pushToken + " is not a valid Expo push token.");
                                    continue;
                                }
                                messages.push({
                                    to: pushToken,
                                    sound: "default",
                                    body: isObserver.name + "\uC774(\uAC00) \uC790\uB9AC\uC5D0 \uC5C6\uC5B4 \uC9D1\uC911\uC2DC\uAC04\uC774 \uC885\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.",
                                    data: {
                                        withSOme: "data",
                                        experienceId: "@username/example",
                                        tag: "" + loggedInUser.id
                                    }
                                });
                            }
                            chunks = expo.chunkPushNotifications(messages);
                            tickets = [];
                            _c = 0, chunks_1 = chunks;
                            _g.label = 2;
                        case 2:
                            if (!(_c < chunks_1.length)) return [3 /*break*/, 7];
                            chunk = chunks_1[_c];
                            _g.label = 3;
                        case 3:
                            _g.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, expo.sendPushNotificationsAsync(chunk)];
                        case 4:
                            ticketChunk = _g.sent();
                            tickets.push.apply(tickets, ticketChunk);
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _g.sent();
                            console.error("Push Notification Error:" + error_1);
                            return [3 /*break*/, 6];
                        case 6:
                            _c++;
                            return [3 /*break*/, 2];
                        case 7:
                            receiptIds = [];
                            for (_d = 0, tickets_1 = tickets; _d < tickets_1.length; _d++) {
                                ticket = tickets_1[_d];
                                if (ticket.id) {
                                    receiptIds.push(ticket.id);
                                }
                            }
                            receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                            _e = 0, receiptIdChunks_1 = receiptIdChunks;
                            _g.label = 8;
                        case 8:
                            if (!(_e < receiptIdChunks_1.length)) return [3 /*break*/, 13];
                            chunk = receiptIdChunks_1[_e];
                            _g.label = 9;
                        case 9:
                            _g.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, expo.getPushNotificationReceiptsAsync(chunk)];
                        case 10:
                            receipts = _g.sent();
                            for (receiptId in receipts) {
                                _f = receipts[receiptId], status = _f.status, details = _f.details;
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
                            return [3 /*break*/, 12];
                        case 11:
                            error_2 = _g.sent();
                            console.error(error_2);
                            return [3 /*break*/, 12];
                        case 12:
                            _e++;
                            return [3 /*break*/, 8];
                        case 13:
                            if (tokens) {
                                return [2 /*return*/, {
                                        ok: true,
                                        message: messages
                                    }];
                            }
                            return [2 /*return*/, {
                                    ok: false,
                                    error: "No Token."
                                }];
                    }
                });
            });
        }
    }
};
exports["default"] = resolvers;
