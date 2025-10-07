"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = __importDefault(require("./blog.controller"));
const upload_1 = require("../../middlewares/upload");
const validationRequest_1 = require("../../utils/validationRequest");
const blog_validation_1 = __importDefault(require("./blog.validation"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post("/create", 
// AuthGuard,
upload_1.upload.single("thumbnail"), (0, validationRequest_1.validateRequest)(blog_validation_1.default.create), blog_controller_1.default.create);
router.get("/all-blogs", blog_controller_1.default.getAllData);
router.get("/:id", blog_controller_1.default.getDataById);
router.patch("/:id", Auth_1.default, upload_1.upload.single("thumbnail"), (0, validationRequest_1.validateRequest)(blog_validation_1.default.update), blog_controller_1.default.update);
router.delete("/:id", Auth_1.default, blog_controller_1.default.deleteByID);
exports.BlogRoutes = router;
