export const createDateRangeQuery = 
`
  INSERT INTO date_ranges (user_id, from_date, to_date, budget)
  VALUES ($1, $2, $3, $4)
`

export const modifyDateRangeQuery =
`
  UPDATE date_ranges 
  set from_date = COALESCE($1, to_date), 
  to_date = COALESCE($2, to_date), 
  budget = COALESCE($3, budget),
  WHERE id = $4 AND user_id = $5
  RETURNING *
`

export const deleteDateRangeQuery = 
`
  DELETE FROM date_ranges
  WHERE id = $1 AND user_id = $2
  RETURNING *
`

export const fetchDateRangeQuery =
`
  SELECT * FROM date_ranges
  WHERE user_id = $1
`