import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

//Instancia del servicio
const bookService = new BookService()

export class BookController {
  //GET-Obtener todos los libros
  async getBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getAll()
      res.json(books)
    } catch (error) {
      console.log(error)
    }
  }

  //GET-Obtener un libro
  async getBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      const book = await bookService.getOne(id)
      res.json(book)
    } catch (error) {
      console.log(error)
    }
  }
  //PATCH-Actualizar lo datos de un libro
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

  //POST-Crear un nuevo libro
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
  //DELETE-Eliminar un linbro
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
