import { deleteCloudinaryImage } from "../../config/cloudinary";
import AppError from "../../utils/AppError";
import statusCode from "../../utils/statusCodes";
import UniversalSearch, {
  TUniversalSearchOptions,
} from "../../utils/UniversalSearch";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const create = async (payload: { data: TBlog; file: Express.Multer.File }) => {
  if (!payload?.file?.path) {
    throw new AppError(
      statusCode.BAD_REQUEST,
      "Must provide an image for thumbnail."
    );
  }

  const data = {
    ...payload.data,
    thumbnail: payload.file.path,
  };

  const project = await BlogModel.create(data);

  if (!project) {
    throw new AppError(statusCode.BAD_REQUEST, "Failed to create blog data.");
  }

  return project;
};

const getAllData = async (payload: TUniversalSearchOptions<TBlog>) => {
  const result = await new UniversalSearch<TBlog | any>(BlogModel).GetData(
    payload
  );
  return result;
};

const getDataById = async (id: string) => {
  const result = await BlogModel.findById(id);
  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Blog not found.");
  }
  return result;
};

const deleteByID = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Blog not found.");
  }

  if (result.thumbnail) {
    await deleteCloudinaryImage(result.thumbnail);
  }

  return result;
};

const update = async (
  id: string,
  payload: { data: Partial<TBlog>; file: Express.Multer.File }
) => {


  
  const data = {
    ...payload.data,
    thumbnail: payload.file?.path,
  };





  
  const result = await BlogModel.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Blog not found.");
  }

  return result;
};

const BlogServices = {
  create,
  getAllData,
  getDataById,
  deleteByID,
  update,
};

export default BlogServices;
