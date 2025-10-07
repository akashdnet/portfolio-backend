"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const path_1 = __importDefault(require("path"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        public_id: (req, file) => {
            console.log(`multer
        
        
        
        
        `, file.originalname);
            const ext = path_1.default.extname(file.originalname).toLowerCase();
            const baseName = path_1.default
                .basename(file.originalname, ext)
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/g, "");
            const uniqueFileName = Math.random().toString(36).substring(2) +
                "-" +
                Date.now() +
                "-" +
                baseName;
            return uniqueFileName;
        },
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
