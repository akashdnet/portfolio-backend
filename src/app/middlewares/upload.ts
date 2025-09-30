import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: (req, file) => {
            const fileName = file.originalname
                .toLowerCase()
                .replace(/\s+/g, "-") 
                .replace(/\./g, "-")
                .replace(/[^a-z0-9\-\.]/g, "")

            const extension = file.originalname.split(".").pop()
            const uniqueFileName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileName + "." + extension
            console.log(`unique file name:    
              
              
              
              
              
              
              
              
              
              
              :`, uniqueFileName)

            return uniqueFileName
        }
    }
})

export const upload = multer({ storage: storage })