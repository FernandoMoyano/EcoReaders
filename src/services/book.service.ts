import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { selectQuery } from '../db/queryUtils'
import { BookId, CreateBook, IBookRow } from '../interfaces/Book.interface'

export class BookService {
  //Obtener todos los libros
  async getAll() {
    const [books] = await selectQuery<IBookRow>('SELECT * FROM books')
    return books
  }

  //Crear un nuevo libro
  async create(data: CreateBook): Promise<ResultSetHeader> {
    console.log('Datos recibidos en create:', data)
    const query =
      'INSERT INTO books (title, author, description, price, bookCondition, category, sellerId, status, isbn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values: CreateBook = Object.values(data)
    const [results] = await pool.execute(query, values)

    return results as ResultSetHeader
  }

  //Eliminar un libro
  async delete(id: BookId): Promise<ResultSetHeader> {
    const query = 'DELETE FROM books WHERE id = ?;'
    const [results] = await pool.execute(query, [id])
    return results as ResultSetHeader
  }
}
