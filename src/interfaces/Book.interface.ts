import { RowDataPacket } from 'mysql2'
import { BookCategory } from '../enums/BookCategory.enum'
import { BookCondition } from '../enums/BookCondition.enum'
import { BookStatus } from '../enums/BookStatus.enum'
import { ZodObject, ZodRawShape } from 'zod'

export interface Images {
  frontCover: string
  backCover: string
}

export interface IBookRow extends RowDataPacket {
  id: number | string
  title: string
  author: string
  description: string
  price: number
  images: Images
  bookCondition: BookCondition
  category: BookCategory
  sellerId: number
  status: BookStatus
  isbn?: string
}

export type CreateBook = Omit<IBookRow, 'sellerId' | 'id'>
export type BookId = string | number
export type ZodSchema<T extends ZodRawShape> = ZodObject<T>
