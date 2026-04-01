"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifiUsersQuery = exports.deleteUserQuery = exports.findAlreadyExistingUserQuery = exports.findUserByIdQuery = exports.loginUserQuery = exports.createUserQuery = void 0;
exports.createUserQuery = `
    INSERT INTO users
    (name, email, password, budget)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, budget;
    `;
exports.loginUserQuery = `
    SELECT id, name, email, password 
    FROM users
    WHERE email = $1
  `;
exports.findUserByIdQuery = `
    SELECT id, name FROM users 
    WHERE id = $1
  `;
exports.findAlreadyExistingUserQuery = `
    SELECT email FROM users
    WHERE email = $1
    LIMIT 1
  `;
exports.deleteUserQuery = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `;
exports.modifiUsersQuery = `
  UPDATE users SET email = $1 
  WHERE id = $2
  RETURNING id, name

`;
