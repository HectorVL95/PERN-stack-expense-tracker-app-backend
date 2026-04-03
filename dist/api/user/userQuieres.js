"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifiUsersQuery = exports.deleteUserQuery = exports.findUserByIdQuery = exports.loginUserQuery = exports.createUserQuery = void 0;
exports.createUserQuery = `
    INSERT INTO users
    (name, email, password, budget, budget)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
exports.loginUserQuery = `
    SELECT email, password FROM users
  `;
exports.findUserByIdQuery = `
    SELECT id, name FROM users WHERE id = $1
    RETURNING name, budget, date_ranges

  `;
exports.deleteUserQuery = `
    DROP id from users
  `;
exports.modifiUsersQuery = `
  UPDATE users SET email = $1 
  WHERE id = $2
  RETURNING id, name

`;
