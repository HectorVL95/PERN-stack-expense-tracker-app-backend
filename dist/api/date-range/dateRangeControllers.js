"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDateRange = exports.modifyDateRange = exports.fetchDateRanges = exports.createDateRange = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const errorResponse_1 = require("../../utils/errorResponse");
const db_1 = __importDefault(require("../../config/db"));
const dateRangeQueries_1 = require("./dateRangeQueries");
exports.createDateRange = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.user;
    const { from_date, to_date, budget } = req.body;
    await db_1.default.query(dateRangeQueries_1.createDateRangeQuery, [userId, from_date, to_date, budget]);
    res.status(201).json({
        success: true,
        message: 'Successfully crated date range'
    });
});
exports.fetchDateRanges = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = req.user;
    const fetched = await db_1.default.query(dateRangeQueries_1.fetchDateRangeQuery, [userId]);
    if (fetched.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('There are no date ranges', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Succesfully fetched data ranges',
        data: fetched.rows
    });
});
exports.modifyDateRange = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = req.user;
    const { from_date, to_date, budget, id } = req.body;
    const updateRange = await db_1.default.query(dateRangeQueries_1.modifyDateRangeQuery, [from_date, to_date, budget, id, userId]);
    if (updateRange.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Unable to update it', 404));
    }
    res.status(200).json({
        sucess: true,
        message: 'Successfully edited date range',
        data: updateRange.rows[0]
    });
});
exports.deleteDateRange = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { id } = req.body;
    const { userId } = req.user;
    const deleteRange = await db_1.default.query(dateRangeQueries_1.deleteDateRangeQuery, [id, userId]);
    if (deleteRange.rowCount === 0) {
        return next(new errorResponse_1.errorResponse('Date range not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Succesfully deleted the date range',
        data: deleteRange.rows[0]
    });
});
