import { NextFunction, Request, Response } from "express";
import { createJWTToken } from "@services/jwt.service"
import { JWTUser } from "@shared-types/users";
import { IController } from "@lib/webrouter";

export default class AuthController implements IController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const token = createJWTToken({
                username: 'test-username',
                email
            } as JWTUser)
            res.json({ok: true, token })
        } catch (error) {
            res.json({ ok: false, message: 'Unexpected Server Error'})
        }
    }
    
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body
            res.json({ ok: true })
        } catch (error) {
            res.json({ ok: false, message: 'Unexpected Server Error'})
        }
    }
}
