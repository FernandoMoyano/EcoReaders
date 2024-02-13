import { NextFunction, Request, Response } from 'express'
import { bookSchema } from '../schema/bookSchema'
import { ZodError } from 'zod'

export const dataValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBook = bookSchema.parse(req.body)
    console.log('Creacion: exitosa: ' + validatedBook)
    console.log('Creacion: exitosa: ' + JSON.stringify(validatedBook, null, 2))
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetail = error.errors.map((err) => ({
        message: err.message,
        path: err.path.join('.'),
        code: err.code,
      }))
      console.log('Error de validación' + errorDetail)
      res.status(400).json({ error: 'Datos de entrada no validos', errorDetail })
    }
  }
}
