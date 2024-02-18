import express, { Router } from 'express'
import { BookService } from '../services/book.service'

export const userRouter: Router = express.Router()

//Instancia de BookService
const bookService = new BookService()

userRouter.get('/')
