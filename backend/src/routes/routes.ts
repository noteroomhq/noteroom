import AuthController from '@controllers/auth.controller';
import { RouterGroup, MainRouterGroup } from '@lib/webrouter';
import { JWTParser } from '@middlewares/jwtparser.middleware';

RouterGroup.new("/auth", [JWTParser], [
    {
        route: '/login',
        method: 'post',
        handler: [AuthController, 'login']
    },
    {
        route: '/signup',
        method: 'post',
        handler: [AuthController, 'signup']
    }
])

export default function WebRouter() {
    return MainRouterGroup.all()
}
