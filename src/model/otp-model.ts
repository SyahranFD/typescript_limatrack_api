import {otp} from "@prisma/client";

export type OtpResponse = {
    id: string;
    email: string;
    otp: string;
}

export type CreateOtpRequest = {
    email: string;
}

export function toOtpResponse(otp: otp): OtpResponse {
    return {
        id: otp.id,
        email: otp.email,
        otp: otp.otp,
    };
}
