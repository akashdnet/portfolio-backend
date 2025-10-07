"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = __importDefault(require("./AppError"));
const statusCodes_1 = __importDefault(require("./statusCodes"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createUser();
    });
}
const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: "admin@akash.com",
        password: "12345678"
    };
    const isExist = yield user_model_1.UserModel.findOne({ email: user.email });
    try {
        if (isExist) {
            console.log(`😎 Already admin user exist - ${user.email}:${user.password}`);
        }
        else {
            const result = yield user_model_1.UserModel.create(user);
            if (result) {
                console.log(`✅ Successfully created admin user - ${user.email}:${user.password}`);
            }
        }
    }
    catch (error) {
        console.log(error);
        new AppError_1.default(statusCodes_1.default.NOT_IMPLEMENTED, "Something went wrong.");
    }
});
