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
const blog_service_1 = __importDefault(require("./blog.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const create = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        data: req.body,
        file: req.file,
    };
    const result = yield blog_service_1.default.create(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.CREATED,
        success: true,
        message: "Project Data created successfully",
        data: result,
    });
}));
const getAllData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getAllData(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "All blog fetched successfully",
        data: result,
    });
}));
const getDataById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const result = yield blog_service_1.default.getDataById(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Blog fetched successfully",
        data: result,
    });
}));
const deleteByID = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const result = yield blog_service_1.default.deleteByID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Blog Deleted successfully",
        data: result,
    });
}));
const update = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`req.body `, req.body);
    console.log(`req.file `, req.file);
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Please provide an id.");
    }
    const payload = { data: req.body, file: req.file };
    const result = yield blog_service_1.default.update(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: statusCodes_1.default.OK,
        success: true,
        message: "Blog Updated successfully",
        data: result,
    });
}));
const ProjectController = {
    create,
    getAllData,
    getDataById,
    deleteByID,
    update,
};
exports.default = ProjectController;
