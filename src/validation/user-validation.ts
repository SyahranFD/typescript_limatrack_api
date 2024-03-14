import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        nama_lengkap: z.string().min(6).max(100),
        email: z.string().min(6).max(320).email(),
        password: z.string().min(6).max(30),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(6).max(320).email(),
        password: z.string().min(6).max(30),
    });

    static readonly UPDATE: ZodType = z.object({
        nama_lengkap: z.string().min(6).max(100).optional(),
        password: z.string().min(6).max(30).optional(),
    });

}
