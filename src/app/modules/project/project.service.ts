import { deleteCloudinaryImage } from "../../config/cloudinary";
import AppError from "../../utils/AppError";
import statusCode from "../../utils/statusCodes";
import UniversalSearch, { TUniversalSearchOptions } from "../../utils/UniversalSearch";
import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";



const create = async (payload:{data:TProject, file: Express.Multer.File}) => {


    if (!payload?.file?.path) {
        throw new AppError(statusCode.BAD_REQUEST, "Must provide an image for thumbnail.");
    }



    const data = {
        ...payload.data,
        thumbnail: payload.file.path
    }

    const project = await ProjectModel.create(data);
    
    if (!project) {
        throw new AppError(statusCode.BAD_REQUEST, "Failed to create project data.");
    }
    
    return project;

}



const getAllProjects = async (payload:TUniversalSearchOptions<TProject>)=>{

    const result = await new UniversalSearch<TProject | any>(ProjectModel).GetData(payload);
    return result

}


const getProjectById = async (id:string)=>{
    const result = await ProjectModel.findById(id);
    if (!result) {
        throw new AppError(statusCode.NOT_FOUND, "Project not found.");
    }   
    return result;
}


const deleteByID = async (id:string)=>{
    
    
  const result = await ProjectModel.findByIdAndDelete(id);
  if(!result){
    throw new AppError(statusCode.NOT_FOUND, "User not found.")
  }

  if(result.thumbnail){
    await deleteCloudinaryImage(result.thumbnail)
  }

  return result;

}



const ProjectServices = {
    create,
    getAllProjects,
    getProjectById,
    deleteByID,
}



export default ProjectServices