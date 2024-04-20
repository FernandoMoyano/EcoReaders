import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'
import { validatorSchema } from '../middlewares/validatorSchema'
import { BookSchema } from '../schema/bookSchema'
//import { checkAuth } from '../middlewares/checkAuth'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET /api/books
bookRoutes.get('/', bookController.getBooks)

//UPDATE /api/books/:id
bookRoutes.patch('/:id', validatorSchema(BookSchema, 'body'), bookController.updateBook)

//GET/api/books/:id
bookRoutes.get('/:id', bookController.getBook)

// GET /api/books/books-by-user/:id - Obtener todos los libros de un usuario
bookRoutes.get('/user/:userId', bookController.getBooksByUser)

//POST /api/books/new
bookRoutes.post('/new', validatorSchema(BookSchema, 'body'), bookController.creteBook)

//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBook)
