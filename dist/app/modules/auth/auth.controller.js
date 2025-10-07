"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const JwtTokenGenerator_1 = __importDefault(require("../../utils/JwtTokenGenerator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const envList_1 = require("../../config/envList");
const setCookies_1 = require("../../utils/setCookies");
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError_1.default(statusCodes_1.default.BAD_REQUEST, "Please provide email and password both.");
    }
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "User not found.");
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new AppError_1.default(statusCodes_1.default.UNAUTHORIZED, "Invalid password.");
    }
    const AccessToken = JwtTokenGenerator_1.default.AccessToken(user);
    const RefreshToken = JwtTokenGenerator_1.default.RefreshToken(user);
    (0, setCookies_1.setAuthCookie)(res, { accessToken: AccessToken, refreshToken: RefreshToken });
    // res.cookie("access_token", AccessToken , { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    // res.cookie("refresh_token", RefreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Login successfully.",
        data: envList_1.envList.NODE_ENV != "development" ? [] : { AccessToken, RefreshToken }
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Logout successfully.",
        data: []
    });
}));
const AuthController = {
    login,
    logout,
};
exports.default = AuthController;
