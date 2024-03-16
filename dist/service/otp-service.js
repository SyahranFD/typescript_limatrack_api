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
exports.OtpService = void 0;
const database_1 = require("../application/database");
const otp_model_1 = require("../model/otp-model");
const otp_validation_1 = require("../validation/otp-validation");
const validation_1 = require("../validation/validation");
const uuid_1 = require("uuid");
const response_error_1 = require("../error/response-error");
const otp_generator_1 = __importDefault(require("otp-generator"));
const mail_sender_1 = require("../utils/mail-sender");
const logging_1 = require("../application/logging");
class OtpService {
    static createOtpUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpRequest = validation_1.Validation.validate(otp_validation_1.OtpValidation.CREATE, request);
            yield database_1.prismaClient.otp.deleteMany({
                where: {
                    email: otpRequest.email
                }
            });
            const totalUserWithSameEmail = yield database_1.prismaClient.user.count({
                where: {
                    email: otpRequest.email
                }
            });
            if (totalUserWithSameEmail != 0) {
                throw new response_error_1.ResponseError(409, 'Email sudah terdaftar');
            }
            let otpCode = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const otp = yield database_1.prismaClient.otp.create({
                data: Object.assign({ id: 'otp-' + (0, uuid_1.v4)(), otp: otpCode }, otpRequest)
            });
            yield this.sendVerificationEmail(otpRequest.email, otp.otp);
            return (0, otp_model_1.toOtpResponse)(otp);
        });
    }
    static createOtpPedagang(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpRequest = validation_1.Validation.validate(otp_validation_1.OtpValidation.CREATE, request);
            yield database_1.prismaClient.otp.deleteMany({
                where: {
                    email: otpRequest.email
                }
            });
            const totalPedagangWithSameEmail = yield database_1.prismaClient.pedagang.count({
                where: {
                    email: otpRequest.email
                }
            });
            if (totalPedagangWithSameEmail != 0) {
                throw new response_error_1.ResponseError(409, 'Email sudah terdaftar');
            }
            let otpCode = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const otp = yield database_1.prismaClient.otp.create({
                data: Object.assign({ id: 'otp-' + (0, uuid_1.v4)(), otp: otpCode }, otpRequest)
            });
            yield this.sendVerificationEmail(otpRequest.email, otp.otp);
            return (0, otp_model_1.toOtpResponse)(otp);
        });
    }
    static sendVerificationEmail(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailResponse = yield (0, mail_sender_1.mailSender)(email, "Verification Email", `<h1>Please confirm your OTP</h1>
                       <p>Here is your OTP code: ${otp}</p>`);
                logging_1.logger.debug("Email sent successfully: ", mailResponse);
            }
            catch (error) {
                logging_1.logger.debug("Error occurred while sending email: ", error);
                throw error;
            }
        });
    }
}
exports.OtpService = OtpService;
