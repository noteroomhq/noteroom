import AuthController from './../app/controllers/auth.controller';
import { Router } from "express"

const router = Router() 

function AuthRouter() {
    const authRouter = Router()
    const controller = new AuthController()

    authRouter.post("/login", controller.login.bind(controller))
    authRouter.post("/signup", controller.signup.bind(controller))

    return authRouter
}

export default function WebRouter() {
    router.use("/auth", AuthRouter())

    return router
}
