"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
class errorResponse extends Error {
    constructor(message, status_code) {
        super(message);
        this.status_code = status_code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.errorResponse = errorResponse;
