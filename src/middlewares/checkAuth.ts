import { NextFunction, Request, Response } from 'express'
import { Auth } from '../auth'
import { authToken } from '../interfaces/User.interface'

//Instancia de auth
const auth = new Auth()

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token: authToken = req.headers.authorization?.split('').pop()
  if (!token) {
    res.json('Necesitas permisos para acceder')
  } else {
    const tokenData = await auth.verifyToken(token)
    console.log(tokenData)
    if (!tokenData) {
      res.status(409)
      res.send({ Error: 'Tu no puedes pasar por aquí' })
    } else {
      res.json('El token no se generó correctamente')
      next()
    }
  }
}
