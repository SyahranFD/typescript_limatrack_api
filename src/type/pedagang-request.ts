import {Request} from "express";
import {Pedagang} from "@prisma/client";

export interface PedagangRequest extends Request {
    pedagang?: Pedagang
}
