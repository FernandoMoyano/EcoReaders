import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET /api/books
bookRoutes.get('/', bookController.getBooksController)
//POST /api/books
bookRoutes.post('/new', bookController.creteBookController)
//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBookController)
