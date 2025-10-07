"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const zod_1 = require("zod");
exports.login = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
const AuthDataValidation = {
    login: exports.login,
};
exports.default = AuthDataValidation;
