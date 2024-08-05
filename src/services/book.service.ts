//BOOKSERVICE.ts

import { BookId, CreateBook, IBookRow } from '../interfaces/Book.interface'
import { v4 as uuidv4 } from 'uuid'
import { CreateResult } from '../interfaces/CreateResult.interface'
import { BookRepository } from '../repositories/BookRepository'
import { prepareUpdateQuery } from '../db/queryUtils'

export class BookService {
  // ➡️Obtener un libro______________________________

  async getOne(id: BookId) {
    try {
      const book = await BookRepository.getBookById(id)
      if (book.length === 0) {
        throw new Error('Error al intentar obtener el libro')
      }
      return book[0]
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Obtener todos los libros por usuario______________

  async getAllByUserId(userId: string) {
    try {
      const books = await BookRepository.getBooksByUserId(userId)
      if (books.length === 0) {
        throw new Error('No se encontraron libros para este usuario')
      }
      return books
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Obtener todos los libros_______________________

  async getAll(page: number, limit: number) {
    try {
      const offset = (page - 1) * limit

      const books = await BookRepository.getAllBooks(limit, offset)
      const totalBooks = await BookRepository.countTotalBooks()

      if (books.length === 0) {
        throw new Error('No se encontraron libros')
      }

      return {
        foundBooks: books.length > 0,
        books,
        totalBooks,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Eliminar un libro________________________

  async delete(id: BookId) {
    try {
      await BookRepository.deleteBook(id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Publicar un nuevo libro_________________________

  async create(bookDetails: CreateBook): Promise<CreateResult> {
    try {
      console.log('Datos recibidos en create:', bookDetails)

      const bookId = uuidv4()
      const bookValues = [
        bookId,
        bookDetails.title,
        bookDetails.author,
        bookDetails.description,
        bookDetails.price,
        bookDetails.image,
        bookDetails.bookCondition,
        bookDetails.category,
        bookDetails.publisherId,
        bookDetails.status,
      ]

      if (bookValues.length === 0) {
        throw new Error('Faltan datos necesarios para la solicitud')
      }

      const queryResult = await BookRepository.insertBook(bookValues)
      const publishedBy = await BookRepository.findUserById(bookDetails.publisherId)

      const result: CreateResult = {
        bookId,
        queryResult,
        bookDetails,
        publishedBy,
      }

      console.log(result)

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Actualizar un libro___________________________

  async update(userId: string, bookId: string, changes: Partial<IBookRow>) {
    try {
      //DEBUG:
      console.log('datos del usuario ', userId)
      console.log('ID del libro:', bookId)
      console.log('Cambios:', changes)

      const validColumns = [
        'title',
        'author',
        'description',
        'price',
        'image',
        'bookCondition',
        'category',
        'publisherId',
        'status',
        'created_at',
      ]

      // Utilizar la función de utilidad para preparar la consulta y filtrar cambios
      const { columnsToUpdate, filteredChanges } = prepareUpdateQuery(changes, validColumns)

      // Llamar a la función del repositorio para ejecutar la actualización
      const result = await BookRepository.updateBookById(
        columnsToUpdate,
        Object.values(filteredChanges),
        bookId,
        userId,
      )

      console.log('Resultado de la actualización:', result)

      return result
    } catch (error) {
      console.error('Error al actualizar el libro:', error)
      throw error
    }
  }
}
