import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'
import { validatorSchema } from '../middlewares/validatorSchema'
import { bookSchema } from '../schema/bookSchema'
import { loggError } from '../middlewares/logError'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET /api/books
bookRoutes.get('/', bookController.getBooks)

//GET/api/books/:id
bookRoutes.get('/:id', bookController.getBook)

//POST /api/books/new
bookRoutes.post('/new', validatorSchema(bookSchema, 'body'), bookController.creteBook)

//UPDATE /api/books/:id
bookRoutes.patch('/:id', bookController.updateBook)

//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBook)

bookRoutes.get('/ruta-de-prueba', loggError)
