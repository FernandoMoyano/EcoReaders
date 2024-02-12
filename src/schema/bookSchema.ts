import z from 'zod'

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
  bookCategory: z.enum(bookCategoryEnum),
})
