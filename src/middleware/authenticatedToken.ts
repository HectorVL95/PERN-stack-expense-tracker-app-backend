import * as jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler'
import { errorResponse } from '../utils/errorResponse'
import { aunthenticatedUser } from '../utils/specialRequests'
import { authenticatedRequest } from '../utils/specialRequests'

export const authenticatedToken = asyncHandler(async (req: authenticatedRequest, res, next) => {
  const autheHeaders = req.headers['authorization']
  const token = autheHeaders && autheHeaders?.split(' ')[1]

  if (!token) return next(new errorResponse('Token not found', 401))

  const secret = process.env.JWT_SECRET as string

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      return next(new errorResponse('Token required', 403))
    }

    req.user = decoded as aunthenticatedUser;

    return next()
  })
  
})