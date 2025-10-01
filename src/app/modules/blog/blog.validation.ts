import { z } from "zod";

export const create = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  categories: z
    .array(z.string().min(1, { message: "At least one category is required" }))
    .min(1, { message: "At least one category is required" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  isPublished: z.boolean().optional(),
  
});

export const update = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  categories: z
    .array(z.string().min(1, { message: "At least one category is required" }))
    .min(1, { message: "At least one category is required" }).optional(),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }).optional(),
  isPublished: z.boolean().optional(),
  
});


const BlogDataValidation = {
  create,
  update,

}


export default BlogDataValidation;