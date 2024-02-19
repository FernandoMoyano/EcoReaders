import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'

export const userRouter: Router = express.Router()
//Instancia del controlador
const userController = new UserController()

userRouter.post('/', userController.createUser)
