// AUTH CONTROLLER

import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { Auth } from '../auth'

//Instancia AuthService
const authService = new AuthService()

//Instancia de Auth
const auth = new Auth()

export class AuthController {
  //➡️Logout
  async logout(req: Request, res: Response) {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      return res.sendStatus(204)
    }
    res.clearCookie('myCookie', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ message: 'Cookie cleared' })
  }

  //➡️refresh token
  async refresh(req: Request, res: Response) {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      res.status(401).json({ message: 'inautorizado' })
      const refreshToken = cookies.jwt
      return refreshToken
    }
  }

  //➡️Login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        return res.status(400).json('Todos los campos son requeridos')
      }
      //DEBUG:
      console.log(username, password)
      const user = await authService.foundUser(username, password)

      if (user) {
        const accesToken = auth.sign(user)
        const id = user.id
        //console.log(accesToken)
        const refreshToken = auth.refreshToken(user)
        res.cookie('myCookie', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({ accesToken, username, id })
      } else {
        res.status(401).json({ error: 'Credenciales invalidas' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error en el servidor' })
    }
  }

  //➡️Registro
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
