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
  SOLD = 'Sold',
  RESERVED = 'Reserved',
}

export interface IBook {
  id: string
  title: string
  author: string
  description: string
  price: number
  images: Images
  bookCondition: BookCondition
  category: BookCategory
  publisherId: string
  publisherName: string
  status: BookStatus
}

export type NewBook = Omit<IBook, 'id' | 'publisherName'>

export interface GetBooks {
  foundBooks: boolean
  books: IBook[]
}
