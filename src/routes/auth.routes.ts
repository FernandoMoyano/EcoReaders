import express from 'express'
import { Authcontroller } from '../controllers/auth.controller'

export const authRoutes = express.Router()

//Instancia de AuthController
const authController = new Authcontroller()

authRoutes.post('/login', authController.login)
