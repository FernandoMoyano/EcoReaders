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
      console.log(books)
      if (!books) {
        res.status(400).json('No se encontraron libros')
      } else {
        res.json(books)
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  //➡️GET-Obtener un libro
  async getBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      const book = await bookService.getOne(id)
      if (!book) {
        res.status(400).json('No se encontraron libros')
      }
      res.json(book)
    } catch (error) {
      console.log(error)
    }
  }
  //➡️PATCH-Actualizar lo datos de un libro
  async updateBook(req: Request, res: Response) {
    try {
      const id = req.params.id
      const body = req.body
      const editedBook = await bookService.update(id, body)
      return res.json(editedBook)
    } catch (error) {
      console.log(error)
    }
  }

  //➡️POST-Crear un nuevo libro
  async creteBook(req: Request, res: Response) {
    try {
      const bookData: CreateBook = req.body
      console.log('Datos del libro recibidos:', bookData)
      const newBook = await bookService.create(bookData)
      res.json(newBook)
    } catch (error) {
      console.log(error)
    }
  }
  //➡️DELETE-Eliminar un linbro
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
