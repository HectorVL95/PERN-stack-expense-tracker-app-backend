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
  
export const findAlreadyExistingUserQuery = 
  `
    SELECT email FROM users
    WHERE email = $1
    LIMIT 1
  `

export const deleteUserQuery =
  `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `

export const modifiUsersQuery = 
`
  UPDATE users SET name = $1 
  WHERE id = $2
  RETURNING id, name

`