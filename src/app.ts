import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";





const app = express()


app.use(express.json())
app.use(cookieParser())



app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Portfolio Backend."
    })
})



app.use(globalErrorHandler)

app.use(notFound)

export default app