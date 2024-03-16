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
exports.PedagangService = void 0;
const pedagang_model_1 = require("../model/pedagang-model");
const validation_1 = require("../validation/validation");
const pedagang_validation_1 = require("../validation/pedagang-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class PedagangService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(pedagang_validation_1.PedagangValidation.REGISTER, request);
            const totalPedagangWithSameEmail = yield database_1.prismaClient.pedagang.count({
                where: {
                    email: registerRequest.email
                }
            });
            if (totalPedagangWithSameEmail != 0) {
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
            const pedagang = yield database_1.prismaClient.pedagang.create({
                data: Object.assign({ id: 'pedagang-' + (0, uuid_1.v4)() }, registerData)
            });
            yield database_1.prismaClient.otp.deleteMany({
                where: {
                    email: registerRequest.email
                }
            });
            yield database_1.prismaClient.pedagang.update({
                where: {
                    email: registerRequest.email
                },
                data: {
                    verified_email: true
                }
            });
            return (0, pedagang_model_1.toPedagangResponse)(pedagang);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedagangRequest = validation_1.Validation.validate(pedagang_validation_1.PedagangValidation.LOGIN, request);
            let pedagang = yield database_1.prismaClient.pedagang.findUnique({
                where: {
                    email: pedagangRequest.email
                }
            });
            if (!pedagang) {
                throw new response_error_1.ResponseError(404, 'Email tidak terdaftar');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(pedagangRequest.password, pedagang.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, 'Password salah');
            }
            pedagang = yield database_1.prismaClient.pedagang.update({
                where: {
                    email: pedagangRequest.email
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, pedagang_model_1.toPedagangResponse)(pedagang);
            response.token = pedagang.token;
            return response;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pedagang = yield database_1.prismaClient.pedagang.findMany({
                include: { Jajanan: true }
            });
            return pedagang;
        });
    }
    static getCurrent(pedagang) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, pedagang_model_1.toPedagangResponse)(pedagang);
        });
    }
    static logout(pedagang) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.pedagang.update({
                where: {
                    email: pedagang.email
                },
                data: {
                    token: null
                }
            });
            return (0, pedagang_model_1.toPedagangResponse)(result);
        });
    }
    static checkPedagangMustExist(pedagangId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedagang = yield database_1.prismaClient.pedagang.findFirst({
                where: {
                    id: pedagangId
                }
            });
            if (!pedagang) {
                throw new response_error_1.ResponseError(404, 'Pedagang not found');
            }
            return pedagang;
        });
    }
}
exports.PedagangService = PedagangService;
