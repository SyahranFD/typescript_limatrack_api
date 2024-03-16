import {Request, Response, NextFunction} from "express";
import {CreateOtpRequest} from "../model/otp-model";
import {OtpService} from "../service/otp-service";

export class OtpController {
    static async createOtpUser(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateOtpRequest = req.body as CreateOtpRequest;
            const response = await OtpService.createOtpUser(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async createOtpPedagang(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateOtpRequest = req.body as CreateOtpRequest;
            const response = await OtpService.createOtpPedagang(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }
}
