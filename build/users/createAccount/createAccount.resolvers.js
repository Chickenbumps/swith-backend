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
var client_1 = __importDefault(require("../../client"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var moment_1 = __importDefault(require("moment"));
var resolvers = {
    Mutation: {
        createAccount: function (_, _a) {
            var name = _a.name, username = _a.username, email = _a.email, password = _a.password, passwordConfirm = _a.passwordConfirm, token = _a.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var usernameCheck, emailCheck, hashedPassword, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, client_1["default"].user.findFirst({
                                    where: {
                                        username: username
                                    }
                                })];
                        case 1:
                            usernameCheck = _b.sent();
                            return [4 /*yield*/, client_1["default"].user.findFirst({
                                    where: {
                                        email: email
                                    }
                                })];
                        case 2:
                            emailCheck = _b.sent();
                            if (usernameCheck) {
                                throw new Error("이미 존재하는 닉네임 입니다.");
                            }
                            else if (emailCheck) {
                                throw new Error("이미 가입된 이메일 입니다.");
                            }
                            if (password !== passwordConfirm) {
                                return [2 /*return*/, {
                                        ok: false,
                                        error: "비밀번호가 일치하지 않습니다."
                                    }];
                            }
                            return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
                        case 3:
                            hashedPassword = _b.sent();
                            return [4 /*yield*/, client_1["default"].user.create({
                                    data: {
                                        name: name,
                                        username: username,
                                        email: email,
                                        bio: "\uC548\uB155\uD558\uC138\uC694." + username + " \uC785\uB2C8\uB2E4.",
                                        password: hashedPassword,
                                        avatar: "https://swith-upload.s3.ap-northeast-2.amazonaws.com/avatar/default.png",
                                        createdAt: moment_1["default"]().format(),
                                        updatedAt: moment_1["default"]().format(),
                                        pushToken: token
                                    }
                                })];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, {
                                    ok: true
                                }];
                        case 5:
                            e_1 = _b.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: console.log("계정을 만들 수 없습니다.", e_1)
                                }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
exports["default"] = resolvers;
