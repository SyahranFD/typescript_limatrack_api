import {Request, Response, NextFunction} from "express";
import {CreatePedagangRequest, LoginPedagangRequest} from "../model/pedagang-model";
import {PedagangService} from "../service/pedagang-service";
import {UserRequest} from "../type/user-request";
import {UserService} from "../service/user-service";
import {PedagangRequest} from "../type/pedagang-request";

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

    static async getCurrent(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const response = await PedagangService.getCurrent(req.pedagang!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async logout(req: PedagangRequest, res: Response, next: NextFunction) {
        try {
            const response = await PedagangService.logout(req.pedagang!);
            res.status(200).json({
                data: "Berhasil Logout"
            })
        } catch (e) {
            next(e);
        }
    }
}
