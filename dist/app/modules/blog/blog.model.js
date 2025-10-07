"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.BlogModel = mongoose_1.default.model("Blog", blogSchema);
