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
}

export enum BookStatus {
  AVAILABLE = 'Available',
  SOLD = 'sold',
  RESERVED = 'reserved',
}

export interface BookI {
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

export interface GetBooks {
  foundBooks: boolean
  books: BookI[]
}
