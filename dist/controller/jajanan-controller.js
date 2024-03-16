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
exports.JajananController = void 0;
const jajanan_service_1 = require("../service/jajanan-service");
const logging_1 = require("../application/logging");
class JajananController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield jajanan_service_1.JajananService.create(req.pedagang, request);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jajananId = req.params.jajananId;
                const response = yield jajanan_service_1.JajananService.getById(req.pedagang, jajananId);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = req.params.jajananId;
                const response = yield jajanan_service_1.JajananService.update(req.pedagang, request);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static removeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jajananId = req.params.jajananId;
                const response = yield jajanan_service_1.JajananService.removeById(req.pedagang, jajananId);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: "Jajanan berhasil dihapus"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.JajananController = JajananController;
