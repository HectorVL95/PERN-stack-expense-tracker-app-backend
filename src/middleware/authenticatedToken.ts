import * as jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler'
import { errorResponse } from '../utils/errorResponse'

export const authenticatedToken = asyncHandler(async (req, res, next) => {
  const autheHeaders = req.headers['authorization']
  const token = autheHeaders && autheHeaders?.split('')[1]

  if (!token) return next(new errorResponse('Token not found', 401))
})