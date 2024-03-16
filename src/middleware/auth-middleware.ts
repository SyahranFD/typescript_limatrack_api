import {Request, Response, NextFunction} from "express";
import {prismaClient} from "../application/database";
import {UserRequest} from "../type/user-request";
import {authPedagangMiddleware} from "./auth-pedagang-middleware";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get('X-API-TOKEN');

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        if (user) {
            req.user = user;
            next();
            return;
        }
    }

    await authPedagangMiddleware(req, res, next);

    // res.status(401).json({
    //     errors: "Unauthorized"
    // }).end();
}
