import { Request, Response } from "express";
import { sendResponse } from "./sendResponse";

export default function testRoute (req:Request, res:Response){
    sendResponse(res, {
        message: "Routes Middleware are working.",
        success:true,
        statusCode: 200,
        data: ["Let's", "GO!!!"]
    })

}