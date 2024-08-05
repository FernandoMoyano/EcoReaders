//BOOKSERVICE.ts
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../db/connection'
import { BookId, CreateBook, IBookRow } from '../interfaces/Book.interface'
import { v4 as uuidv4 } from 'uuid'
import { CreateResult } from '../interfaces/CreateResult.interface'
import { BookRepository } from '../repositories/BookRepository'

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

  async getAll(page: number = 1, limit: number = 9) {
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

      const queryBook = `
      INSERT INTO books
        ( id, title, author, description, price,
          image, bookCondition, category, publisherId, status )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         `
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

      const [insertedBookResult] = await pool.execute(queryBook, bookValues)
      const queryResult: ResultSetHeader = insertedBookResult as ResultSetHeader

      const queryUser = `SELECT * FROM users WHERE id = ?;`
      const [dataUserResult] = await pool.execute(queryUser, [bookDetails.publisherId])
      const publishedBy: RowDataPacket[] = dataUserResult as RowDataPacket[]

      const result: CreateResult = {
        bookId,
        queryResult,
        bookDetails,
        publishedBy,
      }
      //DEBUG:
      console.log(result)

      return result as CreateResult
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
      // Validar las columnas para asegurarse de que existen en la tabla 'books'
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

      const columnsToUpdate = Object.keys(changes)
        .filter((column) => validColumns.includes(column))
        .map((column) => `${column} = ?`)
        .join(', ')

      if (columnsToUpdate.length === 0) {
        throw new Error('No valid columns to update')
      }

      // Convertir created_at a un formato adecuado para MySQL
      if (changes.created_at) {
        changes.created_at = new Date(changes.created_at).toISOString().slice(0, 19).replace('T', ' ')
      }

      // Filtrar cambios
      const filteredChanges = validColumns.reduce((acc, key) => {
        if (changes[key] !== undefined) {
          acc[key] = changes[key]
        }
        return acc
      }, {} as Partial<IBookRow>)

      const query = `
      UPDATE books SET ${columnsToUpdate} 
      WHERE id = ? AND publisherId = ?;
      `
      const values = [
        ...Object.values(filteredChanges).map((value) => (value !== undefined ? value : null)),
        bookId,
        userId,
      ]

      //DEBUG:
      console.log('Query:', query)
      console.log('Values:', values)

      const [result] = await pool.execute(query, values)

      // DEBUG:
      console.log('Resultado de la actualización:', result)

      return result
    } catch (error) {
      console.error('Error al actualizar el libro:', error)
      throw error
    }
  }
}
