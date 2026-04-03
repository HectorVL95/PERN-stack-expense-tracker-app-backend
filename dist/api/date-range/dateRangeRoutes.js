"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dateRangeControllers_1 = require("./dateRangeControllers");
const authenticatedToken_1 = require("../../middleware/authenticatedToken");
const dateRangeRoutes = (0, express_1.Router)();
dateRangeRoutes.use(authenticatedToken_1.authenticatedToken);
dateRangeRoutes
    .get('/date', dateRangeControllers_1.fetchDateRanges)
    .post('/date', dateRangeControllers_1.createDateRange)
    .put('/date', dateRangeControllers_1.modifyDateRange)
    .delete('/date', dateRangeControllers_1.deleteDateRange);
exports.default = dateRangeRoutes;
