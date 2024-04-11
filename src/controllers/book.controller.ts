//bookController.ts
import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

//Instancia del servicio
const bookService = new BookService()

export class BookController {
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

  //➡️GET-Obtener todos los libros publicados por un usuario
  async getBooksByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId // Asumiendo que el ID del usuario se pasa como parámetro en la URL
      const books = await bookService.getAllByUserId(userId)
      if (!books) {
        res.status(400).json('No se encontraron libros para este usuario')
      } else {
        res.json(books)
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  //➡️GET-Obtener todos los libros
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
      //DEBUG:
      console.log('Datos del libro recibidos:', bookData)
      const datesOfTheNewBook = await bookService.create(bookData)
      res.json({ message: 'Libro Creado con Éxito', result: datesOfTheNewBook })
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
