"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseControllers_1 = require("./expenseControllers");
const authenticatedToken_1 = require("../../middleware/authenticatedToken");
const expenseRoutes = (0, express_1.Router)();
expenseRoutes.use(authenticatedToken_1.authenticatedToken);
expenseRoutes
    .post('/expense/:date_range_id', expenseControllers_1.createExpense)
    .put('/expense/:id', expenseControllers_1.editExpense)
    .delete('/expense/:id', expenseControllers_1.deleteExpense)
    .get('/expense/:date_range_id', expenseControllers_1.fetchExpenses)
    .get('/expense/single/:id', expenseControllers_1.fetchExpenseInfo);
exports.default = expenseRoutes;
