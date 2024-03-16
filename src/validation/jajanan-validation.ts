import {z, ZodType} from "zod";

export class JajananValidation {
    static readonly CREATE: ZodType = z.object({
        nama: z.string().min(1).max(100),
        harga: z.number().int().positive(),
        image: z.string(),
        tersedia: z.boolean(),
        kategori: z.string().min(1).max(100),
    });
    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        pedagang_id: z.string(),
        nama: z.string().min(1).max(100),
        harga: z.number().int().positive(),
        image: z.string(),
        tersedia: z.boolean(),
        kategori: z.string().min(1).max(100),
    });
}
