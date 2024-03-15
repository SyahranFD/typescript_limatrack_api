"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedagangValidation = void 0;
const zod_1 = require("zod");
class PedagangValidation {
}
exports.PedagangValidation = PedagangValidation;
PedagangValidation.CREATE = zod_1.z.object({
    email: zod_1.z.string().email().min(6).max(100),
    password: zod_1.z.string().min(6).max(100),
    nama_warung: zod_1.z.string().min(6).max(100),
    nama_pedagang: zod_1.z.string().min(6).max(100),
    image: zod_1.z.string().min(1).max(2000).optional(),
    status: zod_1.z.string().min(1).max(100).optional(),
    jam_buka: zod_1.z.string().optional(),
    jam_tutup: zod_1.z.string().optional(),
    daerah_dagang: zod_1.z.string().min(1).max(100).optional(),
    rating: zod_1.z.number().optional(),
    sertifikasi_halal: zod_1.z.boolean().optional(),
    latitude: zod_1.z.string().min(1).max(100).optional(),
    longitude: zod_1.z.string().min(1).max(100).optional(),
});
