import {NextFunction, Response} from "express";
import {prismaClient} from "../application/database";
import {PedagangRequest} from "../type/pedagang-request";

export const authPedagangMiddleware = async (req: PedagangRequest, res: Response, next: NextFunction) => {
    const token = req.get('X-API-TOKEN');

    if (token) {
        const pedagang = await prismaClient.pedagang.findFirst({
            where: {
                token: token
            }
        });

        if (pedagang) {
            req.pedagang = pedagang;
            next();
            return;
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}
