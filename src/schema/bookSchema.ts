import z from 'zod'

const bookStatusEnum = ['Available', 'Sold', 'Reserved'] as const
const bookConditionEnum = ['new', 'Like new', 'Lined'] as const
const bookCategoryEnum = [
  'Fiction',
  'No Fiction',
  'Mistery',
  'Adventure',
  'Romance',
  'Science Fiction',
  'Fancy',
  'Biography',
  'History',
  'Terror',
  'Sport',
  'Other',
] as const

export const bookSchema = z.object({
  title: z.string().toLowerCase(),
  description: z.string(),
  author: z.string(),
  price: z.number(),
  bookCondition: z.enum(bookConditionEnum),
  category: z.enum(bookCategoryEnum),
  sellerId: z.number(),
  status: z.enum(bookStatusEnum),
  isbn: z.string().optional(),
})
