import {Router} from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken'
import { createUser, loginUser, getLoggedUser, deleteUser, modifyUser  } from './userControllers'

const userRoutes = Router()

userRoutes
  .post('/user', createUser)
  .post('/user/login', loginUser)
  .get('/user', authenticatedToken, getLoggedUser)
  .delete(`/user/:id`, authenticatedToken, deleteUser)
  .put(`/user/:id`, authenticatedToken, modifyUser)

export default userRoutes;