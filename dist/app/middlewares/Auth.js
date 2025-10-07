"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthGuard;
const envList_1 = require("../config/envList");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtTokenGenerator_1 = __importDefault(require("../utils/JwtTokenGenerator"));
const user_model_1 = require("../modules/user/user.model");
const setCookies_1 = require("../utils/setCookies");
const ACCESS_SECRET = envList_1.envList.JWT_ACCESS_SECRET;
const REFRESH_SECRET = envList_1.envList.JWT_REFRESH_SECRET;
function AuthGuard(req, res, next) {
    // console.log(`test cookies: ` ,req.cookies)
    var _a, _b;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refresh_token;
    if (!accessToken && !refreshToken) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(401).json({ message: "No access token or refresh token found!" });
    }
    jsonwebtoken_1.default.verify(accessToken, ACCESS_SECRET, (err, decoded) => {
        if (err && err.name === "TokenExpiredError") {
            try {
                const decodedRefreshToken = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
                const user = user_model_1.UserModel.findOne((u) => u._id === decodedRefreshToken.id);
                if (!user) {
                    res.clearCookie("access_token");
                    res.clearCookie("refresh_token");
                    return res.status(401).json({ message: "Invalid refresh token!" });
                }
                const newAccessToken = JwtTokenGenerator_1.default.AccessToken(user);
                const newRefreshToken = JwtTokenGenerator_1.default.RefreshToken(user);
                (0, setCookies_1.setAuthCookie)(res, { accessToken: newAccessToken, refreshToken: newRefreshToken });
                // res.cookie("access_token", newAccessToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
                // res.cookie("refresh_token", newRefreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
                req.user = { id: user.id, email: user.email };
                return next();
            }
            catch (_a) {
                res.clearCookie("access_token");
                res.clearCookie("refresh_token");
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }
        }
        else if (err) {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            return res.status(403).json({ message: "Invalid access token" });
        }
        else {
            req.user = decoded;
            return next();
        }
    });
}
