export const createDateRangeQuery = 
`
  INSERT INTO data_ranges (user_id, from_date, to_date, budget)
  VALUES ($1, $2, $3, $4)
`

export const modifyDateRangeQuery =
`
  UPDATE data_ranges set from_date = $1, to_date = $2
  WHERE id = $3
  RETURNING *
`

export const deleteDateRangeQuery = 
`
  DELETE * FROM data_ranges
  WHERE id = $1
  RETURNING *
`