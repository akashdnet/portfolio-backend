import { z } from "zod"

export const ProjectDataValidation = z.object({
    title: z.string().min(1, { message: "Title is required" }),
  projectLink: z.url({ message: "Project link must be a valid URL" }),
  liveSite: z.url({ message: "Live site must be a valid URL" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long" }),
  features: z.array(
    z.string().min(1, { message: "At least one feature is required" })
  ).min(1, { message: "At least one feature is required" })
})

