import mongoose from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt"
import { envList } from "../../config/envList";

const userSchema = new mongoose.Schema<TUser>({
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
});





userSchema.pre("save", async function (next) {

  const user = this as TUser & mongoose.Document

  if (!user.isModified("password")) return next()

  try {

    const salt = await bcrypt.genSalt(Number(envList.BCRYPT_SALT_ROUND))
    user.password = await bcrypt.hash(user.password, salt)

    next()
  } catch (err) {
    next(err as Error)
  }
})





export const UserModel = mongoose.model<TUser>("User", userSchema);
