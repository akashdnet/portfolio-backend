import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
import cors from "cors"
import { envList } from "./app/config/envList";





const app = express()


app.use(express.json())
app.use(cookieParser())







const whitelist = ["protfolio-frontend-mu.vercel.app",
"protfolio-frontend-git-main-akashs-projects-88bc9268.vercel.app",
"protfolio-frontend-e7zfmzd10-akashs-projects-88bc9268.vercel.app", envList.FRONT_END_SITE_LOCAL, envList?.FRONT_END_SITE_PRODUCTION]
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))









app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Portfolio Backend."
    })
})



app.use(globalErrorHandler)

app.use(notFound)

export default app