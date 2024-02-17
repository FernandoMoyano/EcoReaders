import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const handleError = (error: ZodError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    console.log('log desde middleware 2')
    const errorDetail = error.errors.map((err) => ({
      message: err.message,
      corregir: err.path.join('.'),
      code: err.code,
    }))
    console.log('Error de validación' + errorDetail)
    res.status(400).json({ error: 'Datos de entrada no validos', errorDetail })
    next()
  }
}
