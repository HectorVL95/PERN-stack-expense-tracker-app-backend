"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedToken = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const errorResponse_1 = require("../utils/errorResponse");
exports.authenticatedToken = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const autheHeaders = req.headers['authorization'];
    const token = autheHeaders && autheHeaders?.split('')[1];
    if (!token)
        return next(new errorResponse_1.errorResponse('Token not found', 401));
});
