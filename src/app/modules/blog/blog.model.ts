import mongoose from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new mongoose.Schema<TBlog>({
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

export const BlogModel = mongoose.model<TBlog>("Blog", blogSchema);
