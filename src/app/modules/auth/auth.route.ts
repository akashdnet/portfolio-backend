import express from "express";
import { validateRequest } from "../../utils/validationRequest";
import AuthDataValidation from "./auth.validation";
import AuthController from "./auth.controller";
;


const router = express.Router();


router.post(
    "/login",
    validateRequest(AuthDataValidation.login),
    AuthController.login
)

router.post(
    "/logout",
    AuthController.logout
)





export const AuthRoutes = router;