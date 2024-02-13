import { NextFunction, Request, Response } from 'express'
import { bookSchema } from '../schema/bookSchema'

export const dataValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBook = bookSchema.parse(req.body)
    console.log('Creacion: exitosa: ' + JSON.stringify(validatedBook, null, 2))
  } catch (error) {
    next(error)
  }
}
