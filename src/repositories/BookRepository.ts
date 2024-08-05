// BookRepository.ts
import { pool } from '../db/connection'
import { IBookRow } from '../interfaces/Book.interface'
import { RowDataPacket } from 'mysql2'

export class BookRepository {
  //➡️Query para obtener un libro por Id

  static async getBookById(bookId: string): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      WHERE books.id = ?;
    `
    const [results] = await pool.execute<RowDataPacket[]>(query, [bookId])
    return results as IBookRow[]
  }

  //➡️Query para obtener los libros publicados por un usuario.

  static async getBooksByUserId(userId: string): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      WHERE books.publisherId = ?;
    `
    const [results] = await pool.execute<RowDataPacket[]>(query, [userId])
    return results as IBookRow[]
  }

  //➡️query para obtener todos los libros

  static async getAllBooks(limit: number, offset: number): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      LIMIT ? OFFSET ?;
    `
    const [results] = await pool.execute<RowDataPacket[]>(query, [limit, offset])
    return results as IBookRow[]
  }

  //➡️Query para obtener el total de libros

  static async countTotalBooks(): Promise<number> {
    const query = `SELECT COUNT(*) as totalBooks FROM books;`
    const [results] = await pool.execute<RowDataPacket[]>(query)
    return (results[0] as RowDataPacket).totalBooks
  }

  //➡️ Query para eliminar un libro

  static async deleteBook(bookId: string): Promise<void> {
    const query = 'DELETE FROM books WHERE id = ?;'
    await pool.execute(query, [bookId])
  }
}
