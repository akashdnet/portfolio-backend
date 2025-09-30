import { Request, Response, Router } from "express"
import { sendResponse } from "../utils/sendResponse"
import testRoute from "../utils/testRoute"




export const router = Router()

const moduleRoutes = [
    {
        path: "/test",
        route: testRoute
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route?.route)
})


