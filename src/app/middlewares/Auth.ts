import { envList } from "../config/envList"
import jwt from "jsonwebtoken"
import JwtTokenGenerator from "../utils/JwtTokenGenerator"
import { UserModel } from "../modules/user/user.model"
import { Request } from "express"



const ACCESS_SECRET = envList.JWT_ACCESS_SECRET
const REFRESH_SECRET = envList.JWT_REFRESH_SECRET



export default function AuthGuard(req: any, res: any, next: any) {
  

  // console.log(`test cookies: ` ,req.cookies)

  const accessToken = req.cookies?.access_token
  const refreshToken = req.cookies?.refresh_token


  if (!accessToken && !refreshToken) {
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    return res.status(401).json({ message: "No access token or refresh token found!" })
  }


  jwt.verify(accessToken, ACCESS_SECRET, (err: any, decoded: any) => {

    if (err && err.name === "TokenExpiredError") { 

      try {

        const decodedRefreshToken: any = jwt.verify(refreshToken, REFRESH_SECRET)
        const user:any = UserModel.findOne((u:any) => u._id === decodedRefreshToken.id)
        if (!user) {
          res.clearCookie("access_token")
          res.clearCookie("refresh_token")
          return res.status(401).json({ message: "Invalid refresh token!" })
        }

        const newAccessToken = JwtTokenGenerator.AccessToken(user)
        const newRefreshToken = JwtTokenGenerator.RefreshToken(user)

        res.cookie("access_token", newAccessToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
        res.cookie("refresh_token", newRefreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })

        req.user = { id: user.id, email: user.email }
        return next()
      } catch {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        return res.status(403).json({ message: "Invalid or expired refresh token" })
      }
    } else if (err) {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
      return res.status(403).json({ message: "Invalid access token" })
    } else {
      req.user = decoded
      return next()
    }
  })
}