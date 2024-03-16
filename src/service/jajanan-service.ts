import {Jajanan, Pedagang} from "@prisma/client";
import {CreateJajananRequest, JajananResponse, toJajananResponse, UpdateJajananRequest} from "../model/jajanan-model";
import {Validation} from "../validation/validation";
import {JajananValidation} from "../validation/jajanan-validation";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";
import {PedagangService} from "./pedagang-service";
import {ResponseError} from "../error/response-error";

export class JajananService {

    static async create(pedagang: Pedagang, request: CreateJajananRequest): Promise<JajananResponse> {
        const createRequest = Validation.validate(JajananValidation.CREATE, request);

        const jajanan = await prismaClient.jajanan.create({
            data: {
                id: 'jajanan-' + uuid(),
                pedagang_id: pedagang.id,
                ...createRequest
            }
        });

        return toJajananResponse(jajanan);
    }

    static async checkJajananMustExist(pedagangId: string, jajananId: string): Promise<Jajanan> {
        const jajanan = await prismaClient.jajanan.findFirst({
            where: {
                id: jajananId,
                pedagang_id: pedagangId
            }
        });

        if (!jajanan) {
            throw new ResponseError(404, 'Jajanan not found');
        }

        return jajanan;
    }

    static async getById(pedagang: Pedagang, id: string): Promise<JajananResponse> {
        const jajanan = await this.checkJajananMustExist(pedagang.id, id);
        return toJajananResponse(jajanan);
    }

    static async update(pedagang: Pedagang, request: UpdateJajananRequest) : Promise<JajananResponse> {
        const updateRequest = Validation.validate(JajananValidation.UPDATE, request);
        await this.checkJajananMustExist(pedagang.id, updateRequest.id);

        const jajanan = await prismaClient.jajanan.update({
            where: {
                id: updateRequest.id,
                pedagang_id: pedagang.id
            },
            data: updateRequest
        });

        return toJajananResponse(jajanan);
    }

    static async removeById(pedagang: Pedagang, id: string) : Promise<JajananResponse> {
        await this.checkJajananMustExist(pedagang.id, id);

        const jajanan = await prismaClient.jajanan.delete({
            where: {
                id: id,
                pedagang_id: pedagang.id
            }
        });

        return toJajananResponse(jajanan);
    }
}
