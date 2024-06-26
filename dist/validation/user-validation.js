"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    nama_lengkap: zod_1.z.string().min(6).max(100),
    email: zod_1.z.string().min(6).max(320).email(),
    password: zod_1.z.string().min(6).max(30),
    otp: zod_1.z.string().min(6).max(6),
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().min(6).max(320).email(),
    password: zod_1.z.string().min(6).max(30),
});
UserValidation.UPDATE = zod_1.z.object({
    nama_lengkap: zod_1.z.string().min(6).max(100).optional(),
    password: zod_1.z.string().min(6).max(30).optional(),
});
