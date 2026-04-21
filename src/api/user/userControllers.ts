import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import pool from '../../config/db';
import { hash, compare } from 'bcrypt'
import { 
  createUserQuery,
  deleteUserQuery, loginUserQuery, 
  findUserByIdQuery, 
  findAlreadyExistingUserQuery,
  modifiUsersQuery 
} from './userQueries';
import jwt from 'jsonwebtoken'
import { authenticatedRequest } from '../../utils/specialRequests';
import { aunthenticatedUser } from '../../utils/specialRequests';

export const createUser  = asyncHandler(async(req, res, next) => {
  const { name, email, password, budget } = req.body

  const existingUser = await pool.query(
    findAlreadyExistingUserQuery,
    [email]
  )

  if (existingUser.rows[0]) {
    return next(new errorResponse('The user already exists', 400))
  }

  const hashedPassword = await hash(password, 10)
  
  const newUser = await pool.query(
    createUserQuery,
    [name, email, hashedPassword, budget]
  )
  
  const token = jwt.sign({userId: newUser.rows[0].id, email: email} ,process.env.JWT_SECRET!, {expiresIn: '99999h', algorithm: 'HS256'})

   res.status(201).json({
    success: true,
    message: 'Created new user',
    data: newUser.rows[0],
    token
  })
})

export const loginUser = asyncHandler(async(req, res, next) => {
  const { email, password } = req.body

  const result = await pool.query(
    loginUserQuery,
    [email]
  )

  const user = result.rows[0]

  if (!user) return next(new errorResponse('User not found', 401))

  const isMatch  = await compare(password, user.password) 

  if (!isMatch) {
    return next((new errorResponse('Invalid credentials', 403)))
  }

  const token = jwt.sign({ userId: user.id , email: email}, process.env.JWT_SECRET!, {expiresIn: '999999h', algorithm: 'HS256'})

  console.log('succesfuly logged')

  res.status(200).json({
    success: true,
    message: 'Succesfully signed in',
    token
  })
})

export const getLoggedUser = asyncHandler(async(req, res, next) => {
  const { userId } = (req as authenticatedRequest).user!

  const user = await pool.query(
    findUserByIdQuery,
    [userId]
  )

  const foundUser = user.rows[0]

  if (!foundUser) {
    return next(new errorResponse('Unable to find user', 404))
  }

  res.status(200).json({
    success: true,
    message: `Successfully found user ${foundUser.name}`,
    data: foundUser
    
  })
})

export const deleteUser = asyncHandler(async(req, res, next) => {
  const { userId } = (req as authenticatedRequest).user!

  const deleteUser = await pool.query(
    deleteUserQuery,
    [userId]
  )

  if (deleteUser.rowCount === 0) return next(new errorResponse('User does not exist', 404))

    res.status(200).json({
      success: true,
      message: 'Sucessfully delete user',
      data: deleteUser.rows[0]
    })
})

export const modifyUser = asyncHandler(async(req, res, next) => {
  const { userId } = (req  as authenticatedRequest).user!
  const { name  } = req.body

  const result = await pool.query(modifiUsersQuery, [name, userId])

  if (result.rowCount === 0) return next(new errorResponse('Error while modifying', 404))
  
  const editedUser = await result.rows[0]

  res.status(200).json({
    success: true,
    messsage: `Successfully edited user ${editedUser.name}`,
    data: editedUser
  })
})