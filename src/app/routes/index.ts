import {  Router } from "express"
import { ProjectRoutes } from "../modules/project/project.route"
import { BlogRoutes } from "../modules/blog/blog.route"




export const router = Router()

const moduleRoutes = [
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


