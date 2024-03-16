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
exports.mailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logging_1 = require("../application/logging");
const mailSender = (email, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        });
        // Send emails to users
        let info = yield transporter.sendMail({
            from: 'Lima Track APP',
            to: email,
            subject: title,
            html: body,
        });
        logging_1.logger.debug("Email info: ", info);
        return info;
    }
    catch (e) {
        logging_1.logger.debug("Error sending email: " + e);
    }
});
exports.mailSender = mailSender;
