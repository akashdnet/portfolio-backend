import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "../../utils/statusCodes";
import AppError from "../../utils/AppError";
import JwtTokenGenerator from "../../utils/JwtTokenGenerator";
import bcrypt from "bcrypt"
import { UserModel } from "../user/user.model";
import { envList } from "../../config/envList";



const login = catchAsync(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError(statusCode.BAD_REQUEST, "Please provide email and password both.");
    }

    const user:any  = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(statusCode.NOT_FOUND, "User not found.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError(statusCode.UNAUTHORIZED, "Invalid password.");
    }


    const AccessToken = JwtTokenGenerator.AccessToken(user)
    const RefreshToken = JwtTokenGenerator.RefreshToken(user)


    res.cookie("access_token", AccessToken , { httpOnly: true, secure: false, maxAge: 15 * 1000 });
    res.cookie("refresh_token", RefreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Login successfully.",
    data: envList.NODE_ENV != "development" ? [] : {AccessToken, RefreshToken }
  });
    


})



const AuthController = {
  login,
  
};

export default AuthController;
