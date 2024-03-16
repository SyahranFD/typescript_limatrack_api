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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JajananService = void 0;
const jajanan_model_1 = require("../model/jajanan-model");
const validation_1 = require("../validation/validation");
const jajanan_validation_1 = require("../validation/jajanan-validation");
const database_1 = require("../application/database");
const uuid_1 = require("uuid");
const response_error_1 = require("../error/response-error");
class JajananService {
    static create(pedagang, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(jajanan_validation_1.JajananValidation.CREATE, request);
            const jajanan = yield database_1.prismaClient.jajanan.create({
                data: Object.assign({ id: 'jajanan-' + (0, uuid_1.v4)(), pedagang_id: pedagang.id }, createRequest)
            });
            return (0, jajanan_model_1.toJajananResponse)(jajanan);
        });
    }
    static checkJajananMustExist(pedagangId, jajananId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jajanan = yield database_1.prismaClient.jajanan.findFirst({
                where: {
                    id: jajananId,
                    pedagang_id: pedagangId
                }
            });
            if (!jajanan) {
                throw new response_error_1.ResponseError(404, 'Jajanan not found');
            }
            return jajanan;
        });
    }
    static getById(pedagang, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jajanan = yield this.checkJajananMustExist(pedagang.id, id);
            return (0, jajanan_model_1.toJajananResponse)(jajanan);
        });
    }
    static update(pedagang, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(jajanan_validation_1.JajananValidation.UPDATE, request);
            yield this.checkJajananMustExist(pedagang.id, updateRequest.id);
            const jajanan = yield database_1.prismaClient.jajanan.update({
                where: {
                    id: updateRequest.id,
                    pedagang_id: pedagang.id
                },
                data: updateRequest
            });
            return (0, jajanan_model_1.toJajananResponse)(jajanan);
        });
    }
    static removeById(pedagang, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkJajananMustExist(pedagang.id, id);
            const jajanan = yield database_1.prismaClient.jajanan.delete({
                where: {
                    id: id,
                    pedagang_id: pedagang.id
                }
            });
            return (0, jajanan_model_1.toJajananResponse)(jajanan);
        });
    }
}
exports.JajananService = JajananService;
