import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET /api/books
bookRoutes.get('/', bookController.getBookController)
//POST /api/books
bookRoutes.post('/new', bookController.creteNewBookController)
//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBookController)
