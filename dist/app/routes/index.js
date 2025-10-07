"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const project_route_1 = require("../modules/project/project.route");
const blog_route_1 = require("../modules/blog/blog.route");
const auth_route_1 = require("../modules/auth/auth.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route === null || route === void 0 ? void 0 : route.route);
});
