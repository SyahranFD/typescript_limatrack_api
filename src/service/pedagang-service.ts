import {
    CreatePedagangRequest,
    LoginPedagangRequest,
    PedagangResponse,
    toPedagangResponse
} from "../model/pedagang-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {PedagangValidation} from "../validation/pedagang-validation";
import {User} from "@prisma/client";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import {toUserResponse} from "../model/user-model";

export class PedagangService {
    static async register(request: CreatePedagangRequest): Promise<PedagangResponse> {
        const pedagangRequest = Validation.validate(PedagangValidation.REGISTER, request);

        const totalPedagangWithSameEmail = await prismaClient.pedagang.count({
            where: {
                email: pedagangRequest.email
            }
        });

        if (totalPedagangWithSameEmail != 0) {
            throw new ResponseError(409, 'Email sudah terdaftar');
        }

        pedagangRequest.id = 'pedagang-' + uuid();
        pedagangRequest.password = await bcrypt.hash(pedagangRequest.password, 10);

        const pedagang = await prismaClient.pedagang.create({
            data: pedagangRequest
        });

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
        const pedagang = await prismaClient.pedagang.findMany();

        return pedagang.map(toPedagangResponse);
    }
}
