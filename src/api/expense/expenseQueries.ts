export const createExpenseQuery =
  `
    INSERT INTO expenses ( name, amount, location, image)
    VALUES ($1, $2, $3, 4, 5)
    RETURNING *
  `

export const editExpenseQuery =
  `
    UPDATE FROM expenses 
    set name = $1, amount = $2, location = $3, image= $4
    RETURNING *
  `


export const deleteExpenseQuery =
  `
    DELETE * FROM expenses
    WHERE id = $1
    RETURNING *
  `

export const fetchExpensesQuery =
  `
    SELECT * FROM expenses
    WHERE date_range_id = $1
  `
