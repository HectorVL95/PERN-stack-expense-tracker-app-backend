"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const testdb_1 = __importDefault(require("./utils/testdb"));
const app = (0, express_1.default)();
(0, testdb_1.default)();
app.get('/', (req, res) => {
    res.send('Backend is alive inside the container');
});
app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
});
