import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { CreateBook } from './Book.interface'

export interface CreateResult {
  bookId: string
  queryResult: ResultSetHeader
  bookDetails: CreateBook
  publishedBy: RowDataPacket[]
}
