"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticatedToken_1 = require("../../middleware/authenticatedToken");
const userControllers_1 = require("./userControllers");
const userRoutes = (0, express_1.Router)();
userRoutes
    .post('/user', userControllers_1.createUser)
    .post('/user/login', userControllers_1.loginUser)
    .get('/user', authenticatedToken_1.authenticatedToken, userControllers_1.getLoggedUser)
    .delete(`/user/`, authenticatedToken_1.authenticatedToken, userControllers_1.deleteUser)
    .put(`/user/:id`, authenticatedToken_1.authenticatedToken, userControllers_1.modifyUser);
exports.default = userRoutes;
