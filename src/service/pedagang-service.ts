import {
    CreatePedagangRequest,
    LoginPedagangRequest,
    PedagangResponse,
    toPedagangResponse, UpdatePedagangRequest
} from "../model/pedagang-model";
import {Validation} from "../validation/validation";
import {PedagangValidation} from "../validation/pedagang-validation";
import {Pedagang, User} from "@prisma/client";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import {toUserResponse, UpdateUserRequest, UserResponse} from "../model/user-model";
import {UserValidation} from "../validation/user-validation";

export class PedagangService {
    static async register(request: CreatePedagangRequest): Promise<PedagangResponse> {
        const registerRequest = Validation.validate(PedagangValidation.REGISTER, request);

        const totalPedagangWithSameEmail = await prismaClient.pedagang.count({
            where: {
                email: registerRequest.email
            }
        });

        if (totalPedagangWithSameEmail != 0) {
            throw new ResponseError(409, 'Email already registered');
        }

        const otp = await prismaClient.otp.findFirst({
            where: {
                email: registerRequest.email
            }
        })

        if (registerRequest.otp != otp!.otp) {
            throw new ResponseError(401, 'OTP Wrong');
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        const { otp: string, ...registerData } = registerRequest;

        const pedagang = await prismaClient.pedagang.create({
            data: {
                id: 'pedagang-' + uuid(),
                ...registerData
            }
        });

        await prismaClient.otp.deleteMany({
            where: {
                email: registerRequest.email
            }
        })

        await prismaClient.pedagang.update({
            where: {
                email: registerRequest.email
            },
            data: {
                verified_email: true
            }
        })

        return toPedagangResponse(pedagang);
    }

    static async login(request: LoginPedagangRequest): Promise<PedagangResponse> {
        const pedagangRequest = Validation.validate(PedagangValidation.LOGIN, request);

        let pedagang = await prismaClient.pedagang.findUnique({
            where: {
                email: pedagangRequest.email
            }
        });

        if (!pedagang) {
            throw new ResponseError(404, 'Email tidak terdaftar');
        }

        const isPasswordValid = await bcrypt.compare(pedagangRequest.password, pedagang.password);

        if (!isPasswordValid) {
            throw new ResponseError(401, 'Password salah');
        }

        pedagang = await prismaClient.pedagang.update({
            where: {
                email: pedagangRequest.email
            },
            data: {
                token: uuid()
            }
        });

        const response = toPedagangResponse(pedagang);
        response.token = pedagang.token!;

        return response;
    }

    static async getAll(): Promise<PedagangResponse[]> {
        return prismaClient.pedagang.findMany({
            include: {Jajanan: true}
        });
    }

    static async getCurrent(pedagang: Pedagang): Promise<PedagangResponse> {
        return toPedagangResponse(pedagang);
    }

    static async update(pedagang: Pedagang, request: UpdatePedagangRequest): Promise<PedagangResponse> {
        const updateRequest = Validation.validate(PedagangValidation.UPDATE, request);
        updateRequest.password = await bcrypt.hash(updateRequest.password, 10);

        const result = await prismaClient.pedagang.update({
            where: {
                email: pedagang.email
            },
            data: updateRequest
        });

        return toPedagangResponse(result);
    }

    static async logout(pedagang: Pedagang): Promise<PedagangResponse> {
        const result = await prismaClient.pedagang.update({
            where: {
                email: pedagang.email
            },
            data: {
                token: null
            }
        });

        return toPedagangResponse(result);
    }
}
