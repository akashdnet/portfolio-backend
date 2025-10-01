import {  Router } from "express"
import { ProjectRoutes } from "../modules/project/project.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { AuthRoutes } from "../modules/auth/auth.route"




export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/project",
        route: ProjectRoutes
    },
    {
        path: "/blog",
        route: BlogRoutes
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route?.route)
})


