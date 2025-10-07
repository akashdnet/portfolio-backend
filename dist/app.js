"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = require("./app/routes");
const cors_1 = __importDefault(require("cors"));
const envList_1 = require("./app/config/envList");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const whitelist = [
    "https://protfolio-frontend-mu.vercel.app",
    "https://protfolio-frontend-git-main-akashs-projects-88bc9268.vercel.app",
    "https://protfolio-frontend-e7zfmzd10-akashs-projects-88bc9268.vercel.app",
    envList_1.envList.FRONT_END_SITE_LOCAL,
    envList_1.envList === null || envList_1.envList === void 0 ? void 0 : envList_1.envList.FRONT_END_SITE_PRODUCTION,
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1", routes_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Portfolio Backend.",
    });
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
