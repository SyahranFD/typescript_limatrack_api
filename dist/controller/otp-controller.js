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
exports.OtpController = void 0;
const otp_service_1 = require("../service/otp-service");
class OtpController {
    static createOtpUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield otp_service_1.OtpService.createOtpUser(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createOtpPedagang(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield otp_service_1.OtpService.createOtpPedagang(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.OtpController = OtpController;
