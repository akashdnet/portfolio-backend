import express from "express";
import BlogServices from "./blog.controller";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../utils/validationRequest";
import BlogDataValidation from "./blog.validation";


const router = express.Router();


router.post(
    "/create",
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
    upload.single("thumbnail"),
    validateRequest(BlogDataValidation.update),
    BlogServices.update
)

router.delete("/:id",
    BlogServices.deleteByID
)





export const BlogRoutes = router;