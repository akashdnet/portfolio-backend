import { Request, Response, Router } from "express"
import { sendResponse } from "../utils/sendResponse"
import testRoute from "../utils/testRoute"
import { ProjectRoutes } from "../modules/project/project.route"




export const router = Router()

const moduleRoutes = [
    {
        path: "/project",
        route: ProjectRoutes
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route?.route)
})


