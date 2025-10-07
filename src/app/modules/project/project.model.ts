import mongoose from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new mongoose.Schema<TProject>({
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

export const ProjectModel = mongoose.model<TProject>("Project", projectSchema);
