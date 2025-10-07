"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envList_1 = require("../config/envList");
function AccessToken(data) {
    const payload = { id: data.id, email: data.email };
    const options = { expiresIn: envList_1.envList.JWT_ACCESS_EXPIRES };
    return jsonwebtoken_1.default.sign(payload, envList_1.envList.JWT_ACCESS_SECRET, options);
}
function RefreshToken(data) {
    const payload = { id: data.id };
    const options = { expiresIn: envList_1.envList.JWT_REFRESH_EXPIRES };
    return jsonwebtoken_1.default.sign(payload, envList_1.envList.JWT_REFRESH_SECRET, options);
}
const JwtTokenGenerator = { AccessToken, RefreshToken };
exports.default = JwtTokenGenerator;
