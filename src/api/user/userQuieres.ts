export const createUserQuery =
   `
    INSERT INTO users
    (name, email, password, budget)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, budget;
    `

export const loginUserQuery = 
  `
    SELECT id, name, email, password 
    FROM users
    WHERE email = $1
  `

export const findUserByIdQuery = 
  `
    SELECT id, name FROM users 
    WHERE id = $1
  `

export const deleteUserQuery =
  `
    DELETE FROM users
    WHERE id = $1
  `
export const modifiUsersQuery = 
`
  UPDATE users SET email = $1 
  WHERE id = $2
  RETURNING id, name

`