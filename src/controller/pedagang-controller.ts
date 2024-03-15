import {Request, Response, NextFunction} from "express";
import {CreatePedagangRequest, LoginPedagangRequest} from "../model/pedagang-model";
import {PedagangService} from "../service/pedagang-service";

export class PedagangController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreatePedagangRequest = req.body as CreatePedagangRequest;
            const response = await PedagangService.register(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginPedagangRequest = req.body as LoginPedagangRequest;
            const response = await PedagangService.login(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await PedagangService.getAll();
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }
}
