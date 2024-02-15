import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

const bookService = new BookService()

export class BookController {
  //GET-Obtener
  async getBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getAll()
      res.json(books)
    } catch (error) {
      console.log(error)
    }
  }

  //GET-Obtener
  async getBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      const book = await bookService.getOne(id)
      res.json(book)
    } catch (error) {
      console.log(error)
    }
  }
  //PATCH-Actualizar
  async updateBook(req: Request, res: Response) {
    try {
      const id = req.params.id
      const body = req.body
      const changeBook = await bookService.update(id, body)
      return res.json(changeBook)
    } catch (error) {
      console.log(error)
    }
  }

  //POST-Crear
  async creteBook(req: Request, res: Response) {
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
  //DELETE-Eliminar
  async deleteBook(req: Request, res: Response) {
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
