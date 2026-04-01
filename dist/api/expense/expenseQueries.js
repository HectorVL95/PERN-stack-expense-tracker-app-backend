"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExpensesQuery = exports.deleteExpenseQuery = exports.editExpenseQuery = exports.createExpenseQuery = void 0;
exports.createExpenseQuery = `
    INSERT INTO expenses ( name, amount, location, image)
    VALUES ($1, $2, $3, 4, 5)
    RETURNING *
  `;
exports.editExpenseQuery = `
    UPDATE FROM expenses 
    set name = $1, amount = $2, location = $3, image= $4
    RETURNING *
  `;
exports.deleteExpenseQuery = `
    DELETE * FROM expenses
    WHERE id = $1
    RETURNING *
  `;
exports.fetchExpensesQuery = `
    SELECT * FROM expenses
    WHERE date_range_id = $1
  `;
