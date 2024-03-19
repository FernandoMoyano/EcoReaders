import z from 'zod'

const bookStatusEnum = ['Available', 'Sold', 'Reserved'] as const
const bookConditionEnum = ['New', 'Like new', 'Lined'] as const
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

export const BookSchema = z.object({
  title: z.string().toLowerCase(),
  description: z.string(),
  author: z.string(),
  price: z.number(),
  images: z.object({
    frontCover: z.string(),
    backCover: z.string(),
  }),
  bookCondition: z.enum(bookConditionEnum),
  category: z.enum(bookCategoryEnum),
  publisherId: z.string(),
  status: z.enum(bookStatusEnum),
})
