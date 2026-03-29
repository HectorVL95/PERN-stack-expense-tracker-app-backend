"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const testDB = async () => {
    try {
        const res = await db_1.default.query('SELECT NOW()');
        console.log('DB Connected:', res.rows);
    }
    catch (err) {
        console.error('DB Error:', err);
    }
};
exports.default = testDB;
