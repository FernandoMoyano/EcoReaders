//BOOKCONTROLLER.ts
import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

//Instancia del servicio
const bookService = new BookService()

export class BookController {
  //➡️GET - Obtener un libro______________________

  async getBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      const book = await bookService.getOne(id)
      if (!book) {
        res.status(404).json('Libro no encontrado')
        return
      }
      res.status(200).json(book)
    } catch (error) {
      console.error(error)
    }
  }

  //➡️GET - Obtener todos los libros publicados por un usuario__________

  async getBooksByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId
      const books = await bookService.getAllByUserId(userId)
      if (!books) {
        res.status(404).json({ message: 'No se encontraron Libros para este usuario' })
      } else {
        res.status(200).json({ message: 'Libros encontrados', data: books })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  //➡️GET - Obtener todos los libros_________________________

  async getBooks(req: Request, res: Response) {
    try {
      // Obtener los parámetros de paginación de la solicitud (con valores por defecto)
      /*   const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 9

      const booksData = await bookService.getAll(page, limit) */

      const limit = parseInt(req.query.limit as string, 10)
      const offset = parseInt(req.query.offset as string, 10)

      if (!Number.isInteger(limit) || !Number.isInteger(offset)) {
        return res.status(400).json({ message: 'Limit and offset must be valid integers.' })
      }

      const booksData = await bookService.getAll(limit, offset)
      //DEBUG:
      console.log(booksData)

      if (!booksData || !booksData.foundBooks) {
        res.status(404).json('No se encontraron libros')
      } else {
        // Responder con los libros y el total de libros
        res.status(200).json(booksData)
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // ➡️PATCH - Actualizar los datos de un libro_______________________

  async updateBook(req: Request, res: Response) {
    try {
      const { userId, bookId } = req.params
      const changes = req.body

      //DEBUG:
      console.log('Parámetros recibidos en req.params:', req.params)
      console.log('Datos recibidos en req.body:', req.body)

      const result = await bookService.update(userId, bookId, changes)

      res.status(200).json({
        message: 'Libro actualizado exitosamente',
        data: result,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error el actualizar el libro',
      })
    }
  }

  //➡️POST - Crear un nuevo libro______________________

  async creteBook(req: Request, res: Response) {
    try {
      const bookData: CreateBook = req.body
      //DEBUG:
      console.log('Datos del libro recibidos:', bookData)
      const newBook = await bookService.create(bookData)
      res.status(201).json({ message: 'Libro Creado con Éxito', result: newBook })
    } catch (error) {
      //DEBUG:
      console.error(error)
    }
  }

  //➡️DELETE - Eliminar un linbro__________________

  async deleteBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      //DEBUG:
      console.log('El id recibido es :' + id)
      const deleteBook = await bookService.delete(id)
      res.status(200).json({ message: 'Libro eliminado con éxito' })
      return deleteBook
    } catch (error) {
      console.error(error)
    }
  }
}
