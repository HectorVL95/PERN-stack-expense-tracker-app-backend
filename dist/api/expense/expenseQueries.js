"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExpenseQueryInfo = exports.fetchExpensesQuery = exports.deleteExpenseQuery = exports.editExpenseQuery = exports.createExpenseQuery = void 0;
exports.createExpenseQuery = `
    INSERT INTO expenses (date_range_id, name, amount, location, image, date_created, hour_created)
    VALUES ($1, $2, $3, $4, $5, NOW()::DATE, NOW()::TIME)
  `;
exports.editExpenseQuery = `
    UPDATE expenses 
    set name = COALESCE($2, name), 
    amount = COALESCE($3, amount), 
    location = COALESCE($4, location), 
    image = COALESCE($5, image)
    WHERE id =  $1
    RETURNING *
  `;
exports.deleteExpenseQuery = `
    DELETE FROM expenses
    WHERE id = $1 AND date_range_id = $2
    RETURNING *
  `;
exports.fetchExpensesQuery = `
    SELECT * FROM expenses
    WHERE date_range_id = $1
  `;
exports.fetchExpenseQueryInfo = `
    SELECT name, amount, location, image, date_created, hour_created FROM expenses
    WHERE id = $1
  `;
