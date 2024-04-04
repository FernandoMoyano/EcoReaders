//Book interface
export interface Images {
  frontCover: string
  backCover: string
}

export enum BookCondition {
  NEW = 'New',
  LIKE_NEW = 'Like New',
  LINED = 'lined',
}

export enum BookCategory {
  FICCTION = 'Fiction',
  NO_FICTION = 'No fiction',
  MISTERY = 'Mistery',
  ADVENTURE = 'Adventure',
  ROMANCE = 'Romance',
  SCIENCE_FICTION = 'Science fiction',
  FANCY = 'Fancy',
  BIOGRAPHY = 'Biography',
  HISTORY = 'History',
  TERROR = 'Terror',
  SPORT = 'Sport',
  OTHER = 'Other',
}

export enum BookStatus {
  AVAILABLE = 'Available',
  SOLD = 'sold',
  RESERVED = 'reserved',
}

export interface BookI {
  id: string
  title: string
  author: string
  description: string
  price: number
  images: Images
  bookCondition: BookCondition
  category: BookCategory
  publisherId: string
  status: BookStatus
}

export type NewBook = Omit<BookI, 'id'>

export interface GetBooks {
  foundBooks: boolean
  books: BookI[]
}
