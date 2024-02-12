import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

const bookService = new BookService()

export class BookController {
  async getBookController(req: Request, res: Response) {
    try {
      const books = await bookService.getAll()
      res.json(books)
    } catch (error) {
      console.log(error)
    }
  }

  async creteNewBookController(req: Request, res: Response) {
    try {
      const bookData: CreateBook = req.body
      // Log de depuración
      console.log('Datos del libro recibidos:', bookData)
      const newBook = await bookService.create(bookData)
      res.json(newBook)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBookController(req: Request, res: Response) {
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
  }
}
