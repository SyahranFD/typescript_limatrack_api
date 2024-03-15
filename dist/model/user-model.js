"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
function toUserResponse(user) {
    return {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        verified_email: user.verified_email,
        latitude: user.latitude,
        longitude: user.longitude
    };
}
exports.toUserResponse = toUserResponse;
