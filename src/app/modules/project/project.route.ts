import express from "express";
import ProjectController from "./project.controller";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../utils/validationRequest";
import { ProjectDataValidation } from "./project.validation";
import AuthGuard from "../../middlewares/Auth";


const router = express.Router();


router.post(
    "/create",
    AuthGuard,
    upload.single("thumbnail"),
    validateRequest(ProjectDataValidation),
    ProjectController.createProject
);

router.get("/all-projects", 
    ProjectController.getAllProjects
)

router.get("/:id",
    ProjectController.getProjectById
)

router.patch("/:id",
    AuthGuard,
    upload.single("thumbnail"),
    validateRequest(ProjectDataValidation),
    ProjectController.update
)

router.delete("/:id",
    AuthGuard,
    ProjectController.deleteByID
)





export const ProjectRoutes = router;