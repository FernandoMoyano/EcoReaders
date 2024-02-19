import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { IUserLogin } from '../interfaces/User.interface'

//Instancia AuthService
const authService = new AuthService()

export class Authcontroller {
  async login(req: Request, res: Response) {
    try {
      const userInfo: IUserLogin = req.body
      console.log(userInfo)
      const data = await authService.foundUser(userInfo)
      if (data) {
        console.log('data :', data)
        if (data[0].email === userInfo.email) {
          res.status(200).json('Inicio de sesion exitoso')
        } else {
          res.json('Credenciales invalidas')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
