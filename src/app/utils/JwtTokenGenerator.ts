import jwt, { SignOptions, Secret } from "jsonwebtoken"
import { envList } from "../config/envList"

interface JwtUserPayload {
  id: string
  email?: string
}




function AccessToken(data: JwtUserPayload): string {
  const payload: JwtUserPayload = { id: data.id, email: data.email }
  const options: SignOptions = { expiresIn: envList.JWT_ACCESS_EXPIRES }
  return jwt.sign(payload, envList.JWT_ACCESS_SECRET as Secret, options)
}



function RefreshToken(data: Pick<JwtUserPayload, "id">): string {
  const payload = { id: data.id }
  const options: SignOptions = { expiresIn: envList.JWT_REFRESH_EXPIRES }
  return jwt.sign(payload, envList.JWT_REFRESH_SECRET as Secret, options)
}

const JwtTokenGenerator = { AccessToken, RefreshToken }
export default JwtTokenGenerator
