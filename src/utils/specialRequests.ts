import { Request } from 'express';

export interface aunthenticatedUser {
  userId?: string,
  email?: string
}

export interface authenticatedRequest<
  Params = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: aunthenticatedUser;
}