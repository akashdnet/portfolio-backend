import express from "express";
import ProjectController from "./project.controller";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../utils/validationRequest";
import { ProjectDataValidation } from "./project.validation";


const router = express.Router();


router.post(
    "/create",
    upload.single("thumbnail"),
    validateRequest(ProjectDataValidation),
    ProjectController.createProject
);

router.get("/all-projects", 
    ProjectController.getAllProjects
)





export const ProjectRoutes = router;