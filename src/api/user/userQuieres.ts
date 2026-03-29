export const createUserQuery =
   `
    INSERT INTO users
    (name, email, password, budget, budget)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `

export const findUserQuery = 
  `
    SELECT email, password FROM users
  `

export const deleteUserQuery =
  `
    DROP id from users
  `