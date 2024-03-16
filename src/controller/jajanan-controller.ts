import {PedagangRequest} from "../type/pedagang-request";
import {Response, NextFunction} from "express";
import {CreateJajananRequest, UpdateJajananRequest} from "../model/jajanan-model";
import {JajananService} from "../service/jajanan-service";
import {logger} from "../application/logging";
import {UpdatePedagangRequest} from "../model/pedagang-model";

export class JajananController {

    static async create(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateJajananRequest = req.body as CreateJajananRequest;
            const response = await JajananService.create(req.pedagang!, request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getById(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const jajananId = req.params.jajananId;
            const response = await JajananService.getById(req.pedagang!, jajananId);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateById(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateJajananRequest = req.body as UpdateJajananRequest
            request.id = req.params.jajananId;

            const response = await JajananService.update(req.pedagang!, request);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async removeById(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const jajananId = req.params.jajananId;
            const response = await JajananService.removeById(req.pedagang!, jajananId);
            logger.debug("response : " + JSON.stringify(response));
            res.status(200).json({
                data: "Jajanan berhasil dihapus"
            });
        } catch (e) {
            next(e);
        }
    }
}
