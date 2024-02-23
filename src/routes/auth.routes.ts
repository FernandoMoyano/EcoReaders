import express from 'express'
import { AuthController } from '../controllers/auth.controller'

export const authRoutes = express.Router()

//Instancia de AuthController
const authController = new AuthController()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)
