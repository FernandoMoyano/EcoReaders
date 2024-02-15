import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'
import { validatorSchema } from '../middlewares/dataValidator'
import { bookSchema } from '../schema/bookSchema'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET /api/books
bookRoutes.get('/', bookController.getBooks)
//GET/api/books/:id
bookRoutes.get('/:id', bookController.getBook)
//POST /api/books/new
bookRoutes.post('/new', validatorSchema(bookSchema, 'body'), bookController.creteBook)
//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBook)
//UPDATE /api/books/:id
