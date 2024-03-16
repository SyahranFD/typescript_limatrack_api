import {z, ZodType} from "zod";

export class OtpValidation {

    static readonly CREATE: ZodType = z.object({
        email: z.string().min(6).max(320).email(),
    });

}
