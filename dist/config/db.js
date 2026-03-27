"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = pool;
