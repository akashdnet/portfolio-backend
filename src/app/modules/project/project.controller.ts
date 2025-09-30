import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TProject } from "./project.interface";
import ProjectServices from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "../../utils/statusCodes";



const createProject = catchAsync(async (req: Request, res: Response) => {


  const payload:{data:TProject, file: Express.Multer.File}= { data : req.body, file: req.file!}


  const result = await ProjectServices.create(payload);


  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project Data created successfully",
    data: result,
  });
});



const getAllProjects = catchAsync(async (req: Request, res: Response)=>{

    const result = await ProjectServices.getAllProjects(req.query);

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Projects fetched successfully",
        data: result
    })


})


const ProjectController = {
    createProject,
    getAllProjects,
}

export default ProjectController;