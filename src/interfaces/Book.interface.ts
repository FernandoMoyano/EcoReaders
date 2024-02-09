import { RowDataPacket } from 'mysql2'
import { BookCategory } from '../enums/BookCategory.enum'
import { BookCondition } from '../enums/BookCondition.enum'
import { BookStatus } from '../enums/BookStatus.enum'

export interface IBookRow extends RowDataPacket {
  id: number | string
  title: string
  author: string
  description: string
  price: number
  bookCondition: BookCondition
  category: BookCategory
  sellerId: number
  status: BookStatus
  isbn?: string
}

export type CreateBook = Omit<IBookRow, 'sellerId' | 'id'>
export type BookId = string | number
