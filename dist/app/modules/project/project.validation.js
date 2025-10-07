"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDataValidationUpdate = exports.ProjectDataValidationCreate = void 0;
const zod_1 = require("zod");
exports.ProjectDataValidationCreate = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    projectLink: zod_1.z.url({ message: "Project link must be a valid URL" }),
    liveSite: zod_1.z.url({ message: "Live site must be a valid URL" }),
    description: zod_1.z.string().min(5, { message: "Description must be at least 5 characters long" }),
    features: zod_1.z.array(zod_1.z.string().min(1, { message: "At least one feature is required" })).min(1, { message: "At least one feature is required" }),
    isPublished: zod_1.z.boolean().optional(),
});
exports.ProjectDataValidationUpdate = zod_1.z.object({
    // _id: z.string(),
    title: zod_1.z.string().min(1, { message: "Title is required" }).optional(),
    projectLink: zod_1.z.url({ message: "Project link must be a valid URL" }).optional(),
    liveSite: zod_1.z.url({ message: "Live site must be a valid URL" }).optional(),
    description: zod_1.z.string().min(5, { message: "Description must be at least 5 characters long" }).optional(),
    features: zod_1.z.array(zod_1.z.string().min(1, { message: "At least one feature is required" })).min(1, { message: "At least one feature is required" }).optional(),
    thumbnail: zod_1.z.url({ message: "Thumbnail must be a valid URL" }).optional(),
    isPublished: zod_1.z.boolean().optional(),
});
