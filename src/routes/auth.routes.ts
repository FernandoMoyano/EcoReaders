import express from 'express'
import { AuthController } from '../controllers/auth.controller'
import { UserLoginSchema, UserRegisterSchema } from '../schema/userSchema'
import { validatorSchema } from '../middlewares/validatorSchema'
//import { checkAuth } from '../middlewares/checkAuth'

export const authRoutes = express.Router()

//Uso de middleware que chequea la validez del token
//authRoutes.use(checkAuth)
//Instancia de AuthController
const authController = new AuthController()

authRoutes.post('/register', validatorSchema(UserRegisterSchema, 'body'), authController.register)
authRoutes.post('/login', validatorSchema(UserLoginSchema, 'body'), authController.login)
authRoutes.get('/refresh', authController.refresh)
authRoutes.post('/logout', authController.logout)
