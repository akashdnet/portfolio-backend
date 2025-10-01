import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import path from "path";

const storage = new CloudinaryStorage({

  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();

      const baseName = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        baseName;

      return uniqueFileName;
    },
  },
  
});

export const upload = multer({ storage: storage });
