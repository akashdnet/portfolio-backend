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
const blog_model_1 = require("./blog.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.file) === null || _a === void 0 ? void 0 : _a.path)) {
        throw new AppError_1.default(statusCodes_1.default.BAD_REQUEST, "Must provide an image for thumbnail.");
    }
    const data = Object.assign(Object.assign({}, payload.data), { thumbnail: payload.file.path });
    const project = yield blog_model_1.BlogModel.create(data);
    if (!project) {
        throw new AppError_1.default(statusCodes_1.default.BAD_REQUEST, "Failed to create blog data.");
    }
    return project;
});
const getAllData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield new UniversalSearch_1.default(blog_model_1.BlogModel).GetData(payload);
    return result;
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findById(id);
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Blog not found.");
    }
    return result;
});
const deleteByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Blog not found.");
    }
    if (result.thumbnail) {
        yield (0, cloudinary_1.deleteCloudinaryImage)(result.thumbnail);
    }
    return result;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = Object.assign(Object.assign({}, payload.data), { thumbnail: (_a = payload.file) === null || _a === void 0 ? void 0 : _a.path });
    const result = yield blog_model_1.BlogModel.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
        throw new AppError_1.default(statusCodes_1.default.NOT_FOUND, "Blog not found.");
    }
    return result;
});
const BlogServices = {
    create,
    getAllData,
    getDataById,
    deleteByID,
    update,
};
exports.default = BlogServices;
