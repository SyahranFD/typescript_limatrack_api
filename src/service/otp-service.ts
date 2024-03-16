import {prismaClient} from "../application/database";
import {CreateOtpRequest, OtpResponse, toOtpResponse} from "../model/otp-model";
import {OtpValidation} from "../validation/otp-validation";
import {Validation} from "../validation/validation";
import {v4 as uuid} from "uuid";
import {ResponseError} from "../error/response-error";
import otpGenerator from "otp-generator";
import {mailSender} from "../utils/mail-sender";
import {logger} from "../application/logging";

export class OtpService {
    static async createOtpUser(request: CreateOtpRequest): Promise<OtpResponse> {
        const otpRequest = Validation.validate(OtpValidation.CREATE, request);

        await prismaClient.otp.deleteMany({
            where: {
                email: otpRequest.email
            }
        })

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: otpRequest.email
            }
        });

        if (totalUserWithSameEmail != 0) {
            throw new ResponseError(409, 'Email sudah terdaftar');
        }

        let otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const otp = await prismaClient.otp.create({
            data: {
                id: 'otp-' + uuid(),
                otp: otpCode,
                ...otpRequest
            }
        });

        await this.sendVerificationEmail(otpRequest.email, otp.otp);

        return toOtpResponse(otp);
    }

    static async createOtpPedagang(request: CreateOtpRequest): Promise<OtpResponse> {
        const otpRequest = Validation.validate(OtpValidation.CREATE, request);

        await prismaClient.otp.deleteMany({
            where: {
                email: otpRequest.email
            }
        })

        const totalPedagangWithSameEmail = await prismaClient.pedagang.count({
            where: {
                email: otpRequest.email
            }
        });

        if (totalPedagangWithSameEmail != 0) {
            throw new ResponseError(409, 'Email sudah terdaftar');
        }

        let otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const otp = await prismaClient.otp.create({
            data: {
                id: 'otp-' + uuid(),
                otp: otpCode,
                ...otpRequest
            }
        });

        await this.sendVerificationEmail(otpRequest.email, otp.otp);

        return toOtpResponse(otp);
    }

    static async sendVerificationEmail(email: string, otp: string) {
        try {
            const mailResponse = await mailSender(
                email,
                "Verification Email",
                `<h1>Please confirm your OTP</h1>
                       <p>Here is your OTP code: ${otp}</p>`
            );
            logger.debug("Email sent successfully: ", mailResponse);
        } catch (error) {
            logger.debug("Error occurred while sending email: ", error);
            throw error;
        }
    }
}
