import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'

export const userRoutes: Router = express.Router()
//Instancia del controlador
const userController = new UserController()

userRoutes.post('/', userController.createUser)
