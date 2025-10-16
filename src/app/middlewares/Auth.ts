import { envList } from "../config/envList"
import jwt from "jsonwebtoken"
import JwtTokenGenerator from "../utils/JwtTokenGenerator"
import { UserModel } from "../modules/user/user.model"
import { setAuthCookie } from "../utils/setCookies"

const ACCESS_SECRET = envList.JWT_ACCESS_SECRET
const REFRESH_SECRET = envList.JWT_REFRESH_SECRET

export default async function AuthGuard(req: any, res: any, next: any) {
  const accessToken = req.cookies?.access_token
  const refreshToken = req.cookies?.refresh_token

  if (!accessToken || !refreshToken) {
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    return res.status(401).json({ message: "No access token or refresh token found!" })
  }

  try {
    
    const decoded: any = jwt.verify(accessToken, ACCESS_SECRET)
    req.user = decoded
    return next()
  } catch (err: any) {
    
    if (err.name === "TokenExpiredError") {
      try {
        const decodedRefreshToken: any = jwt.verify(refreshToken, REFRESH_SECRET)


        const user = await UserModel.findOne({ _id: decodedRefreshToken.id })

        if (!user) {
          res.clearCookie("access_token")
          res.clearCookie("refresh_token")
          return res.status(401).json({ message: "Invalid refresh token!" })
        }



        const new_data = { id: user.id, email: user.email }
        const newAccessToken = JwtTokenGenerator.AccessToken(new_data)
        const newRefreshToken = JwtTokenGenerator.RefreshToken(new_data)

        
        // setAuthCookie(res, { accessToken: newAccessToken, refreshToken: newRefreshToken })

        req.user = { id: user.id, email: user.email }
        return next()
      } catch (refreshErr: any) {
        console.error("Invalid or expired refresh token", refreshErr)
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        return res.status(403).json({ message: "Invalid or expired refresh token" })
      }
    }

    
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    return res.status(403).json({ message: "Invalid access token" })
  }
}
