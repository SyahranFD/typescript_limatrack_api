"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JajananValidation = void 0;
const zod_1 = require("zod");
class JajananValidation {
}
exports.JajananValidation = JajananValidation;
JajananValidation.CREATE = zod_1.z.object({
    nama: zod_1.z.string().min(1).max(100),
    harga: zod_1.z.number().int().positive(),
    image: zod_1.z.string(),
    tersedia: zod_1.z.boolean(),
    kategori: zod_1.z.string().min(1).max(100),
});
JajananValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    pedagang_id: zod_1.z.string(),
    nama: zod_1.z.string().min(1).max(100),
    harga: zod_1.z.number().int().positive(),
    image: zod_1.z.string(),
    tersedia: zod_1.z.boolean(),
    kategori: zod_1.z.string().min(1).max(100),
});
