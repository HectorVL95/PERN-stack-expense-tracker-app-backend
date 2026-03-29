import { Request, Response, NextFunction, RequestHandler } from 'express';

type asyncHandlerTypes = (
  req: Request,
  res: Response,
  next: NextFunction
 ) => void | Promise<void>

export const asyncHandler = (fn: asyncHandlerTypes): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}