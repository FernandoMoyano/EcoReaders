//BOOKROUTES.TS
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

//GET /api/books/:id
bookRoutes.get('/:id', bookController.getBook)

//UPDATE /api/books/user/:userId/edit/:bookId
bookRoutes.patch('/user/:userId/edit/:bookId', validatorSchema(BookSchema, 'body'), bookController.updateBook)

// GET /api/books/:userId/books - Obtener todos los libros de un usuario
bookRoutes.get('/user/:userId/my-books', bookController.getBooksByUser)

//POST /api/books/new
bookRoutes.post('/new', validatorSchema(BookSchema, 'body'), bookController.creteBook)

//DELETE /api/books/:id
bookRoutes.delete('/:id', bookController.deleteBook)
