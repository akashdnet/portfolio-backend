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
const cloudinary_1 = require("../../config/cloudinary");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const statusCodes_1 = __importDefault(require("../../utils/statusCodes"));
const UniversalSearch_1 = __importDefault(require("../../utils/UniversalSearch"));
const project_model_1 = require("./project.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.file) === null || _a === void 0 ? void 0 : _a.path)) {
        throw new AppError_1.default(statusCodes_1.default.BAD_REQUEST, "Must provide an image for thumbnail.");
    }
    const data = Object.assign(Object.assign({}, payload.data), { thumbnail: payload.file.path });
    const project = yield project_model_1.ProjectModel.create(data);
    if (!project) {
        throw new AppError_1.default(statusCodes_1.default.BAD_REQUEST, "Failed to create project data.");
    }
    return project;
});
const getAllProjects = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield new UniversalSearch_1.default(project_model_1.ProjectModel).GetData(payload);
    return result;
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findById(id);
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Project not found.");
    }
    return result;
});
const deleteByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Project not found.");
    }
    if (result.thumbnail) {
        yield (0, cloudinary_1.deleteCloudinaryImage)(result.thumbnail);
    }
    return result;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const isExist = yield project_model_1.ProjectModel.findById(id);
    let data;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.file) === null || _a === void 0 ? void 0 : _a.path)) {
        data = Object.assign({}, payload.data);
    }
    else {
        data = Object.assign(Object.assign({}, payload.data), { thumbnail: (_b = payload.file) === null || _b === void 0 ? void 0 : _b.path });
    }
    const result = yield project_model_1.ProjectModel.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Project not found.");
    }
    if (((_c = payload === null || payload === void 0 ? void 0 : payload.file) === null || _c === void 0 ? void 0 : _c.path) && (isExist === null || isExist === void 0 ? void 0 : isExist.thumbnail)) {
        yield (0, cloudinary_1.deleteCloudinaryImage)(result.thumbnail);
    }
    return result;
});
const ProjectServices = {
    create,
    getAllProjects,
    getProjectById,
    deleteByID,
    update,
};
exports.default = ProjectServices;
