"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = __importDefault(require("./project.controller"));
const upload_1 = require("../../middlewares/upload");
const validationRequest_1 = require("../../utils/validationRequest");
const project_validation_1 = require("./project.validation");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post("/create", Auth_1.default, upload_1.upload.single("thumbnail"), (0, validationRequest_1.validateRequest)(project_validation_1.ProjectDataValidationCreate), project_controller_1.default.createProject);
router.get("/all-projects", project_controller_1.default.getAllProjects);
router.get("/:id", project_controller_1.default.getProjectById);
router.put("/:id", Auth_1.default, upload_1.upload.single("thumbnail"), (0, validationRequest_1.validateRequest)(project_validation_1.ProjectDataValidationUpdate), project_controller_1.default.update);
router.delete("/:id", Auth_1.default, project_controller_1.default.deleteByID);
exports.ProjectRoutes = router;
