"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
const notFound = (req, res, next) => {
    res.status(statusCodes_1.default.NOT_FOUND).json({
        success: false,
        message: "No route found",
    });
};
exports.default = notFound;
