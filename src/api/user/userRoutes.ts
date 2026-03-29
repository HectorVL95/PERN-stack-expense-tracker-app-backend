import {Router} from 'express'
import { createUser } from './userControllers' 

const userRoutes = Router()

userRoutes.post('/create_user', createUser)

export default userRoutes;