//bookService.ts
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../db/connection'
import { selectQuery } from '../db/queryUtils'
import { BookId, CreateBook, IBookRow } from '../interfaces/Book.interface'
import { v4 as uuidv4 } from 'uuid'
import { CreateResult } from '../interfaces/CreateResult.interface'

export class BookService {
  //➡️Obtener un libro
  async getOne(id: BookId) {
    try {
      const bookId = id
      const query = 'SELECT * FROM books WHERE id = ?'
      const [results] = await pool.execute(query, [bookId])
      if (!results) {
        throw new Error('Error al intentar obtener el libro')
      }
      return results
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Eliminar un libro
  async delete(id: BookId): Promise<ResultSetHeader> {
    try {
      const query = 'DELETE FROM books WHERE id = ?;'
      const [results] = await pool.execute(query, [id])
      return results as ResultSetHeader
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Obtener todos los libros
  async getAll() {
    try {
      const books = await selectQuery<IBookRow>('SELECT * FROM books')
      if (books.length === 0) {
        throw new Error('No se encontraron libros')
      }
      return { foundBooks: books.length > 0, books }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Crear un nuevo libro
  async create(data: CreateBook): Promise<CreateResult> {
    try {
      console.log('Datos recibidos en create:', data)

      const queryBook =
        'INSERT INTO books (id, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
      //const values: CreateBook = Object.values(data)
      const bookValues = [
        uuidv4(),
        data.title,
        data.author,
        data.description,
        data.price,
        JSON.stringify(data.images), // images (convertido a JSON)
        data.bookCondition,
        data.category,
        data.publisherId,
        data.status,
      ]
      if (!bookValues) {
        throw new Error('Faltan datos necesarios para la solicitud')
      }

      const [insertedBookResult] = await pool.execute(queryBook, bookValues)
      const resultingBook: ResultSetHeader = insertedBookResult as ResultSetHeader
      const queryUser = 'SELECT * FROM users WHERE id = ?'
      const [dataUserResult] = await pool.execute(queryUser, [data.publisherId])
      const publishedBy: RowDataPacket[] = dataUserResult as RowDataPacket[]

      const result: CreateResult = {
        resultingBook,
        publishedBy,
      }

      return result as CreateResult
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //➡️Actualizar un libro
  async update(id: BookId, changes: Partial<IBookRow>) {
    try {
      const bookId = id
      const columnsToUpdate = Object.keys(changes)
        .map((column) => `${column} = ?`)
        .join(', ')
      const query = `UPDATE books SET ${columnsToUpdate} WHERE id = ?;`
      const values = [...Object.values(changes), bookId]
      const booksWithChanges = await pool.execute(query, values)
      return booksWithChanges
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
