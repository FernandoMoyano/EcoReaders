import express, { Request, Response, Router } from 'express'
import { BookService } from '../services/book.service'
import { BookId, CreateBook } from '../interfaces/Book.interface'

export const bookRoutes: Router = express.Router()

const bookService = new BookService()

//GET /api/books
bookRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAll()
    res.json(books)
  } catch (error) {
    console.log(error)
  }
})

//POST /api/books
bookRoutes.post('/new', async (req: Request, res: Response) => {
  try {
    const bookData: CreateBook = req.body
    // Log de depuración
    console.log('Datos del libro recibidos:', bookData)
    const newBook = await bookService.create(bookData)
    res.json(newBook)
  } catch (error) {
    console.log(error)
  }
})

//DELETE /api/books/:id
bookRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: BookId = req.params.id
    //Log depuración
    console.log('El id recibido es :' + id)
    const deleteBook = await bookService.delete(id)
    res.json(deleteBook)
    return deleteBook
  } catch (error) {
    console.log(error)
  }
})
