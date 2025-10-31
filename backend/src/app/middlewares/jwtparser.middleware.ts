import { Request, Response, NextFunction } from "express";
import { IMiddleWare } from "@lib/webrouter";

export class JWTParser implements IMiddleWare {
    handle(req: Request, res: Response, next: NextFunction): void {

        next()
    }
}
