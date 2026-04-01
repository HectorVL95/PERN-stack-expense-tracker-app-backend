"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseControllers_1 = require("./expenseControllers");
const authenticatedToken_1 = require("../../middleware/authenticatedToken");
const expenseRoutes = (0, express_1.Router)();
expenseRoutes.use(authenticatedToken_1.authenticatedToken);
expenseRoutes
    .post('/expense', expenseControllers_1.createExpense)
    .put('/expense', expenseControllers_1.editExpense)
    .delete('/expense', expenseControllers_1.deleteExpense)
    .get('expense', expenseControllers_1.fetchExpenses);
exports.default = expenseRoutes;
