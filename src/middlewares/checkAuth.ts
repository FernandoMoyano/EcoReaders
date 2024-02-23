import { NextFunction, Request, Response } from 'express'
import { Auth } from '../auth'

//Instancia de auth
const auth = new Auth()

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('').pop()
  if (!token) {
    res.json('Necesitas permisos para acceder')
  } else {
    //retorna la data del payload descodificada
    const tokenData = await auth.verifyToken(token)
    console.log(tokenData)
    if (!tokenData) {
      res.status(409)
      res.send({ Error: 'Tu no puedes pasar por aquí' })
    } else {
      res.json('Bienvenido')
      next()
    }
  }
}
