"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../utils/validationRequest");
const auth_validation_1 = __importDefault(require("./auth.validation"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
;
const router = express_1.default.Router();
router.post("/login", (0, validationRequest_1.validateRequest)(auth_validation_1.default.login), auth_controller_1.default.login);
router.post("/logout", auth_controller_1.default.logout);
exports.AuthRoutes = router;
