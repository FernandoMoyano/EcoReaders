import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { sign } from '../auth'

//Instancia AuthService
const authService = new AuthService()

export class AuthController {
  //Login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      console.log(username, password)
      const user = await authService.foundUser(username, password)

      if (user) {
        const token = sign(user)
        return res.json(token)
      } else {
        res.status(401).json({ error: 'Credenciales invalidas' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error en el servidor' })
    }
  }
}
