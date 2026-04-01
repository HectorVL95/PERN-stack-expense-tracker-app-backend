"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDateRangeQuery = exports.deleteDateRangeQuery = exports.modifyDateRangeQuery = exports.createDateRangeQuery = void 0;
exports.createDateRangeQuery = `
  INSERT INTO date_ranges (user_id, from_date, to_date, budget)
  VALUES ($1, $2, $3, $4)
`;
exports.modifyDateRangeQuery = `
  UPDATE date_ranges set from_date = $1, to_date = $2, budget = $3
  WHERE id = $4 AND user_id = $5
  RETURNING *
`;
exports.deleteDateRangeQuery = `
  DELETE FROM date_ranges
  WHERE id = $1 AND user_id = $2
  RETURNING *
`;
exports.fetchDateRangeQuery = `
  SELECT * FROM date_ranges
  WHERE user_id = $1
`;
