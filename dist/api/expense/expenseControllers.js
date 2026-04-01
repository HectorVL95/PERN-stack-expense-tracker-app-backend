"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExpenses = exports.deleteExpense = exports.editExpense = exports.createExpense = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const errorResponse_1 = require("../../utils/errorResponse");
const expenseQueries_1 = require("./expenseQueries");
const db_1 = __importDefault(require("../../config/db"));
exports.createExpense = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { name, amount, location, image } = req.body;
    const created = await db_1.default.query(expenseQueries_1.createExpenseQuery, [name, amount, location, image]);
    if (created.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Expense not created', 400));
    }
    res.status(200).json({
        success: true,
        message: 'Expense created, successfully',
        data: created.rows[0]
    });
});
exports.editExpense = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { name, amount, location, image } = req.body;
    const edited = await db_1.default.query(expenseQueries_1.editExpenseQuery, [name, amount, location, image]);
    if (edited.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Expense to edit not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Successfully edited expense',
        data: edited.rows[0]
    });
});
exports.deleteExpense = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { id } = req.body;
    const deleted = await db_1.default.query(expenseQueries_1.deleteExpenseQuery, [id]);
    if (deleted.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Expense to delete not ound', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Succesfully deleted expense',
        data: deleted.rows[0]
    });
});
exports.fetchExpenses = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { date_range_id } = req.body;
    const fetched = await db_1.default.query(expenseQueries_1.fetchExpensesQuery, [date_range_id]);
    if (fetched.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Expenses do not exist for this date range', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Successfuly found Expenses',
        data: fetched.rows
    });
});
