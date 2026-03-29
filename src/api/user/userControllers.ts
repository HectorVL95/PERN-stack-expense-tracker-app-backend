import { asyncHandler } from '../../utils/asyncHandler';
import { errorResponse } from '../../utils/errorResponse';
import pool from '../../config/db';
import { hash } from 'bcrypt'
import { createUserQuery, deleteUserQuery, findUserQuery } from './userQuieres';
import jwt from 'jsonwebtoken'
import { authenticatedRequest } from '../../utils/specialRequests';

export const createUser  = asyncHandler(async(req, res) => {
  const { name, password, email, password, budget } = req.body

  const hashedPassword = await hash(password, 10)

  const newUser = await pool.query(
    createUserQuery,
    [name, email, hashedPassword, budget, budget]
  )

  res.status(201).json({
    success: true,
    message: 'Created new user',
    data: newUser.rows[0]
  })
})

export const loginUser = asyncHandler(async(req, res, next) => {
  const { email, password } = req.body

  const user = await pool.query(
    findUserQuery,
    [email, password]
  )

  if (!user) return next(new errorResponse('User not found', 401))

  const token = jwt.sign({ userId: user.oid , email: email}, process.env.JWT_SECRET!, {expiresIn: '999999h', algorithm: 'HS256'})

  console.log('succesfuly logged')

  res.status(200).json({
    success: true,
    message: 'Succesfully signed in',
    data: token
  })
})

export const deleteUser = asyncHandler(async(req, res, next) => {
  const { userId } = (req as authenticatedRequest).body

  const deleteUser = await pool.query(
    deleteUserQuery,
    userId
  )

  if (!deleteUser) return next(new errorResponse('User does not exist', 400))

    res.status(200).json({
      success: true
      message: 'Sucessfully delete user',
      data: deleteUser
    })
})