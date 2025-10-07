"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = testRoute;
const sendResponse_1 = require("./sendResponse");
function testRoute(req, res) {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Routes Middleware are working.",
        success: true,
        statusCode: 200,
        data: ["Let's", "GO!!!"]
    });
}
