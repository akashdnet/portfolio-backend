"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
// res.cookie('YOUR_COOKIE_NAME', token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'none',
//   maxAge: COOKIE_EXPIRE_TIME,
// });
const setAuthCookie = (res, tokenInfo) => {
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
exports.setAuthCookie = setAuthCookie;
