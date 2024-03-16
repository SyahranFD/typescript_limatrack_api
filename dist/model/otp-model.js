"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOtpResponse = void 0;
function toOtpResponse(otp) {
    return {
        id: otp.id,
        email: otp.email,
        otp: otp.otp,
    };
}
exports.toOtpResponse = toOtpResponse;
