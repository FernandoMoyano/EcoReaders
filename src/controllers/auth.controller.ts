import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { sign } from '../auth'

//Instancia AuthService
const authService = new AuthService()

export class AuthController {
  //Login
  async login(req: Request, res: Response) {
    try {
      const userInfo = req.body
      console.log(userInfo)
      const data = await authService.foundUser(userInfo)
      if (data) {
        //console.log('data ==>', data)
        if (data[0].username === userInfo.username && data[0].password === userInfo.password) {
          //generar token
          return res.json(sign(data[0]))
        } else {
          res.json('credenciales invalidas')
        }
      } else {
        throw new Error('Usuario no encontrado')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
