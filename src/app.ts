import express, { Request, Response } from "express";
// import notFound from "./app/middlewares/notFound";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";





const app = express()








app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Portfolio Backend."
    })
})



// app.use(globalErrorHandler)

// app.use(notFound)

export default app