import express from 'express'
import { AuthController } from '../controllers/auth.controller'
import { UserLoginSchema, UserRegisterSchema } from '../schema/userSchema'
import { validatorSchema } from '../middlewares/validatorSchema'

export const authRoutes = express.Router()

//Instancia de AuthController
const authController = new AuthController()

authRoutes.post('/register', validatorSchema(UserRegisterSchema, 'body'), authController.register)
authRoutes.post('/login', validatorSchema(UserLoginSchema, 'body'), authController.login)
authRoutes.post('/refresh', authController.refresh)
authRoutes.post('/logout', authController.logout)
