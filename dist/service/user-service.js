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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const model_user_1 = require("../model/model-user");
const database_1 = require("../application/database");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
const uuid_1 = require("uuid");
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
                throw new response_error_1.ResponseError(409, 'Email sudah terdaftar');
            }
            registerRequest.id = 'user-' + (0, uuid_1.v4)();
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            return (0, model_user_1.toUserResponse)(user);
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
            const response = (0, model_user_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
}
exports.UserService = UserService;
