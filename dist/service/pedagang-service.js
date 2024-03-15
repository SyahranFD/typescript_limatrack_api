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
exports.PedagangService = void 0;
const pedagang_model_1 = require("../model/pedagang-model");
const validation_1 = require("../validation/validation");
const pedagang_validation_1 = require("../validation/pedagang-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class PedagangService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedagangRequest = validation_1.Validation.validate(pedagang_validation_1.PedagangValidation.CREATE, request);
            const totalPedagangWithSameEmail = yield database_1.prismaClient.pedagang.count({
                where: {
                    email: pedagangRequest.email
                }
            });
            if (totalPedagangWithSameEmail != 0) {
                throw new response_error_1.ResponseError(409, 'Email sudah terdaftar');
            }
            pedagangRequest.id = 'pedagang-' + (0, uuid_1.v4)();
            pedagangRequest.password = yield bcrypt_1.default.hash(pedagangRequest.password, 10);
            const pedagang = yield database_1.prismaClient.pedagang.create({
                data: pedagangRequest
            });
            return (0, pedagang_model_1.toPedagangResponse)(pedagang);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pedagang = yield database_1.prismaClient.pedagang.findMany();
            return pedagang.map(pedagang_model_1.toPedagangResponse);
            // return {
            //     data: pedagang.map(pedagang => toPedagangResponse(pedagang))
            // }
        });
    }
}
exports.PedagangService = PedagangService;
