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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../model/user-model");
const database_1 = require("../application/database");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
const uuid_1 = require("uuid");
const logging_1 = require("../application/logging");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const totalUserWithSameEmail = yield database_1.prismaClient.user.count({
                where: {
                    email: registerRequest.email
                }
            });
            if (totalUserWithSameEmail != 0) {
                throw new response_error_1.ResponseError(409, 'Email already registered');
            }
            const otp = yield database_1.prismaClient.otp.findFirst({
                where: {
                    email: registerRequest.email
                }
            });
            if (registerRequest.otp != otp.otp) {
                throw new response_error_1.ResponseError(401, 'OTP Wrong');
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const { otp: string } = registerRequest, registerData = __rest(registerRequest, ["otp"]);
            const user = yield database_1.prismaClient.user.create({
                data: Object.assign({ id: 'user-' + (0, uuid_1.v4)() }, registerData)
            });
            yield database_1.prismaClient.otp.deleteMany({
                where: {
                    email: registerRequest.email
                }
            });
            yield database_1.prismaClient.user.update({
                where: {
                    email: registerRequest.email
                },
                data: {
                    verified_email: true
                }
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Email is wrong");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            logging_1.logger.debug("isPasswordValid: " + isPasswordValid);
            logging_1.logger.debug("user.password: " + user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "password is wrong");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    email: loginRequest.email
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: updateRequest
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
