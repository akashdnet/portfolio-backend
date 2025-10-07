import { Response } from "express";
import { envList } from "../config/envList";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

// res.cookie('YOUR_COOKIE_NAME', token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'none',
//   maxAge: COOKIE_EXPIRE_TIME,
// });

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("access_token", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refresh_token", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }
};
