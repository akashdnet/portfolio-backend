"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    projectLink: {
        type: String,
        required: true,
    },
    liveSite: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    // isPublished: {
    //   type: Boolean,
    //   default: false,
    // }
}, { timestamps: true });
exports.ProjectModel = mongoose_1.default.model("Project", projectSchema);
