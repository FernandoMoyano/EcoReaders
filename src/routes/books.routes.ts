//BOOKROUTES.TS

import express from 'express'
import { Router } from 'express'
import { BookController } from '../controllers/book.controller'
import { validatorSchema } from '../middlewares/validatorSchema'
import { BookSchema } from '../schema/bookSchema'
//import { checkAuth } from '../middlewares/checkAuth'

export const bookRoutes: Router = express.Router()
const bookController = new BookController()

//GET http://localhost:3000/api/books - ➡️Obtener todos los libros
bookRoutes.get('/', bookController.getBooks)

// GET - http://localhost:3000/api/books/:userId/books - ➡️Obtener todos los libros de un usuario
bookRoutes.get('/user/:userId/my-books', bookController.getBooksByUser)

//GET - http://localhost:3000/api/books/:id - ➡️Obtener un libro por id
bookRoutes.get('/:id', bookController.getBook)

//UPDATE - http://localhost:3000/api/books/user/:userId/edit/:bookId - ➡️Actualizar libros
bookRoutes.patch('/user/:userId/edit/:bookId', validatorSchema(BookSchema, 'body'), bookController.updateBook)

//POST - http://localhost:3000/api/books/new - ➡️Publicar un libro
bookRoutes.post('/new', validatorSchema(BookSchema, 'body'), bookController.creteBook)

//DELETE - http://localhost:3000/api/books/:id - ➡️Eliminar un libro
bookRoutes.delete('/:id', bookController.deleteBook)
