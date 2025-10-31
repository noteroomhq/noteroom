import { Request, Response, NextFunction, Router } from "express";

export interface IMiddleWare {
    handle(req: Request, res: Response, next: NextFunction): void;
}

export interface IController {}

type ClassType<T> = new (...args: any[]) => T;
type ControllerHandler = string;
type GroupRoute = {
    route: string;
    method: "get" | "post";
    handler: [ClassType<IController>, ControllerHandler];
};


export class MainRouterGroup {
    protected static routeGroups: Router[] = [];

    protected static addRoute(route: Router): void {
        this.routeGroups.push(route);
    }

    static all(): Router {
        const allRouter = Router();
        this.routeGroups.forEach((router) => {
            allRouter.use(router);
        });
        return allRouter;
    }
}

export class RouterGroup extends MainRouterGroup {
    static new(prefix: string, middlewares: ClassType<IMiddleWare>[], groutes: GroupRoute[]): Router {
        const router = Router();
        groutes.forEach((route) => {
            router[route.method](
                prefix + route.route,
                ...middlewares.map((m) => new m().handle),
                new route.handler[0]()[route.handler[1]]
            );
        });
        super.addRoute(router);
        return router;
    }
}
