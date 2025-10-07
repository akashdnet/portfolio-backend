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
const AppError_1 = __importDefault(require("../utils/AppError"));
const envList_1 = require("../config/envList");
const cloudinary_1 = require("../config/cloudinary");
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    envList_1.envList.NODE_ENV == "development" && console.log(err);
    if (req.file) {
        yield (0, cloudinary_1.deleteCloudinaryImage)(req.file.path);
    }
    let statusCode = 500;
    let message = "Something Went Wrong!";
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Access Token!";
    }
    else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token Expired!";
    }
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envList_1.envList.NODE_ENV === "development" ? err.stack : null
    });
});
exports.default = globalErrorHandler;
