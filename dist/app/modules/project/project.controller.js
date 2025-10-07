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
const project_service_1 = __importDefault(require("./project.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        data: req.body,
        file: req.file,
    };
    const result = yield project_service_1.default.create(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.CREATED,
        success: true,
        message: "Project Data created successfully",
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.default.getAllProjects(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Projects fetched successfully",
        data: result,
    });
}));
const getProjectById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const result = yield project_service_1.default.getProjectById(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Project fetched successfully",
        data: result,
    });
}));
const deleteByID = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const result = yield project_service_1.default.deleteByID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Project Deleted successfully",
        data: result,
    });
}));
const update = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const payload = { data: req.body, file: req.file };
    const result = yield project_service_1.default.update(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Project Updated successfully",
        data: result,
    });
}));
const ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteByID,
    update,
};
exports.default = ProjectController;
