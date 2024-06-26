import {z, ZodType} from "zod";

export class PedagangValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().email().min(6).max(100),
        password: z.string().min(6).max(100),
        nama_warung: z.string().min(6).max(100),
        nama_pedagang: z.string().min(6).max(100),
        image: z.string().min(1).max(2000).optional(),
        jam_buka: z.string().optional(),
        jam_tutup: z.string().optional(),
        daerah_dagang: z.string().min(1).max(100).optional(),
        sertifikasi_halal: z.boolean().optional(),
        otp: z.string().min(6).max(6),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email().min(6).max(100),
        password: z.string().min(6).max(100),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        email: z.string().email().min(6).max(100),
        password: z.string().min(6).max(100),
        verified_email: z.boolean().optional(),
        token: z.string().optional(),
        nama_warung: z.string().min(6).max(100),
        nama_pedagang: z.string().min(6).max(100),
        image: z.string().min(1).max(2000).optional(),
        buka: z.boolean().optional(),
        jam_buka: z.string().optional(),
        jam_tutup: z.string().optional(),
        daerah_dagang: z.string().min(1).max(100).optional(),
        rating: z.number().optional(),
        sertifikasi_halal: z.boolean().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
    });
}
