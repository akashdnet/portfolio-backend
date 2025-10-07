"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const zod_1 = require("zod");
exports.create = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    categories: zod_1.z
        .array(zod_1.z.string().min(1, { message: "At least one category is required" }))
        .min(1, { message: "At least one category is required" }),
    description: zod_1.z
        .string()
        .min(5, { message: "Description must be at least 5 characters long" }),
    isPublished: zod_1.z.boolean().optional(),
});
exports.update = zod_1.z.object({
    // _id: z.string(),
    title: zod_1.z.string().min(1, { message: "Title is required" }).optional(),
    description: zod_1.z.string().min(5, { message: "Description must be at least 5 characters long" }).optional(),
    categories: zod_1.z.array(zod_1.z.string().min(1, { message: "At least one feature is required" })).min(1, { message: "At least one feature is required" }).optional(),
    thumbnail: zod_1.z.url({ message: "Thumbnail must be a valid URL" }).optional(),
    isPublished: zod_1.z.boolean().optional(),
});
const BlogDataValidation = {
    create: exports.create,
    update: exports.update,
};
exports.default = BlogDataValidation;
