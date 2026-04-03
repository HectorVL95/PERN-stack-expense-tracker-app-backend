export const createExpenseQuery =
  `
    INSERT INTO expenses (date_range_id, name, amount, location, image, date_created, hour_created)
    VALUES ($1, $2, $3, $4, $5, NOW()::DATE, NOW()::TIME)
  `

export const editExpenseQuery =
  `
    UPDATE expenses 
    set name = COALESCE($2, name), 
    amount = COALESCE($3, amount), 
    location = COALESCE($4, location), 
    image = COALESCE($5, image)
    WHERE id =  $1
    RETURNING *
  `

export const deleteExpenseQuery =
  `
    DELETE FROM expenses
    WHERE id = $1 AND date_range_id = $2
    RETURNING *
  `

export const fetchExpensesQuery =
  `
    SELECT * FROM expenses
    WHERE date_range_id = $1
  `

export const fetchExpenseQueryInfo =
  `
    SELECT name, amount, location, image, date_created, hour_created FROM expenses
    WHERE id = $1
  `