import { NextFunction, Request, Response } from "express";


export default class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            res.json({ ok: true })
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
