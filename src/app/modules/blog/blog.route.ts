import express from "express";
import BlogServices from "./blog.controller";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../utils/validationRequest";
import BlogDataValidation from "./blog.validation";
import AuthGuard from "../../middlewares/Auth";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponse";


const router = express.Router();


router.post(
    "/create",
    AuthGuard,
    upload.single("thumbnail"),
    validateRequest(BlogDataValidation.create),
    BlogServices.create
)

router.get("/all-blogs", 
    BlogServices.getAllData
)

router.get("/:id",
    BlogServices.getDataById
)

router.patch("/:id",   
    AuthGuard,
    upload.single("thumbnail"),
    validateRequest(BlogDataValidation.update),
    BlogServices.update
)

router.delete("/:id",
    AuthGuard,
    BlogServices.deleteByID
)





export const BlogRoutes = router;