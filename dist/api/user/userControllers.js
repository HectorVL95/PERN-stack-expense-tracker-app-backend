"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyUser = exports.deleteUser = exports.getLoggedUser = exports.loginUser = exports.createUser = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const errorResponse_1 = require("../../utils/errorResponse");
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = require("bcrypt");
const userQueries_1 = require("./userQueries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { name, email, password, budget } = req.body;
    const existingUser = await db_1.default.query(userQueries_1.findAlreadyExistingUserQuery, [email]);
    if (existingUser.rows[0]) {
        return next(new errorResponse_1.errorResponse('The user already exists', 400));
    }
    const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
    const newUser = await db_1.default.query(userQueries_1.createUserQuery, [name, email, hashedPassword, budget]);
    res.status(201).json({
        success: true,
        message: 'Created new user',
        data: newUser.rows[0]
    });
});
exports.loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { email, password } = req.body;
    const result = await db_1.default.query(userQueries_1.loginUserQuery, [email]);
    const user = result.rows[0];
    if (!user)
        return next(new errorResponse_1.errorResponse('User not found', 401));
    const isMatch = await (0, bcrypt_1.compare)(password, user.password);
    if (!isMatch) {
        return next((new errorResponse_1.errorResponse('Invalid credentials', 403)));
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: email }, process.env.JWT_SECRET, { expiresIn: '999999h', algorithm: 'HS256' });
    console.log('succesfuly logged');
    res.status(200).json({
        success: true,
        message: 'Succesfully signed in',
        token
    });
});
exports.getLoggedUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = req.user;
    const user = await db_1.default.query(userQueries_1.findUserByIdQuery, [userId]);
    const foundUser = user.rows[0];
    if (!foundUser) {
        return next(new errorResponse_1.errorResponse('Unable to find user', 404));
    }
    res.status(200).json({
        success: true,
        message: `Successfully found user ${foundUser.name}`,
        data: foundUser
    });
});
exports.deleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = req.user;
    const deleteUser = await db_1.default.query(userQueries_1.deleteUserQuery, [userId]);
    if (deleteUser.rowCount === 0)
        return next(new errorResponse_1.errorResponse('User does not exist', 404));
    res.status(200).json({
        success: true,
        message: 'Sucessfully delete user',
        data: deleteUser.rows[0]
    });
});
exports.modifyUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = req.body;
    const { name } = req.body;
    const result = await db_1.default.query(userQueries_1.modifiUsersQuery, [name, userId]);
    if (result.rowCount === 0)
        return next(new errorResponse_1.errorResponse('Error while modifying', 404));
    const editedUser = await result.rows[0];
    res.status(200).json({
        success: true,
        messsage: `Successfully edited user ${editedUser.name}`,
        data: editedUser
    });
});
