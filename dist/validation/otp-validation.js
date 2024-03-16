"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpValidation = void 0;
const zod_1 = require("zod");
class OtpValidation {
}
exports.OtpValidation = OtpValidation;
OtpValidation.CREATE = zod_1.z.object({
    email: zod_1.z.string().min(6).max(320).email(),
});
