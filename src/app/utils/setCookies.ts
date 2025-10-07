import { Response } from "express";
import { envList } from "../config/envList";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("access_token", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refresh_token", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};