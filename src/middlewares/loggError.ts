import { NextFunction, Request, Response } from 'express'

export const loggError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.log(`Error al acceder a la ruta ${req.url}${err.stack}`)
    //DEBUG:
    console.log('log desde middleware 3')
    res.status(500).json('Error interno del servidor')
  }
  next()
}
