import { NextFunction, Request, Response } from 'express'
import { bookSchema } from '../schema/bookSchema'
import { ZodSchema } from '../interfaces/Book.interface'
import { ZodRawShape } from 'zod'

export const dataValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBook = bookSchema.parse(req.body)
    console.log('Creacion: exitosa: ' + JSON.stringify(validatedBook, null, 2))
  } catch (error) {
    next(error)
  }
}

export const validatorSchema = <T extends ZodRawShape>(schema: ZodSchema<T>, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property as keyof Request]
      const validate = schema.parse(data)
      console.log('validación exitosa' + validate)
    } catch (error) {
      console.log('log desde middleware 1')
      next(error)
    }
  }
}
