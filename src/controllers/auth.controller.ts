import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { Auth } from '../auth'

//Instancia AuthService
const authService = new AuthService()
//Instancia de Auth
const auth = new Auth()

export class AuthController {
  //Login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      console.log(username, password)
      const user = await authService.foundUser(username, password)

      if (user) {
        const token = auth.sign(user)
        return res.json(token)
      } else {
        res.status(401).json({ error: 'Credenciales invalidas' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error en el servidor' })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body
      if (!data) {
        throw new Error('Se necesitan los datos correspondientes para crear un usuario')
      }
      const newUser = authService.create(data)
      res.status(200).json(`Usuario creado satisfactoriamente `)
      return newUser
    } catch (error) {
      res.status(500).json('Error interno del servidor')
    }
  }
}
