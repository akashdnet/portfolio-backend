import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TBlog } from "./blog.interface";
import BlogServices from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "../../utils/statusCodes";
import AppError from "../../utils/AppError";

const create = catchAsync(async (req: Request, res: Response) => {
  const payload: { data: TBlog; file: Express.Multer.File } = {
    data: req.body,
    file: req.file!,
  };

  const result = await BlogServices.create(payload);

  sendResponse(res, {
    statusCode: statusCode.CREATED,
    success: true,
    message: "Project Data created successfully",
    data: result,
  });
});


const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllData(req.query);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "All blog fetched successfully",
    data: result,
  });
});


const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(statusCode.NOT_FOUND, "Please provide an id.");
  }
  const result = await BlogServices.getDataById(id);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Blog fetched successfully",
    data: result,
  });
});


const deleteByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(statusCode.NOT_FOUND, "Please provide an id.");
  }
  const result = await BlogServices.deleteByID(id);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Blog Deleted successfully",
    data: result,
  });
});



const update = catchAsync(async (req: Request, res: Response) => {
  console.log(`req.body `,req.body)
  console.log(`req.file `,req.file)

  const { id } = req.params;
  if (!id) {
    throw new AppError(statusCode.NOT_FOUND, "Please provide an id.");
  }

  const payload: { data: TBlog; file: Express.Multer.File } = {data: req.body, file: req.file!};

  const result = await BlogServices.update(id, payload);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Blog Updated successfully",
    data: result,
  });
});

const ProjectController = {
  create,
  getAllData,
  getDataById,
  deleteByID,
  update,
};

export default ProjectController;
