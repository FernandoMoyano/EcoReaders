import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
/* import { IUserLogin } from '../interfaces/User.interface' */

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
        console.log('data ==>', data)
        if (data[0].username === userInfo.username && data[0].password === userInfo.password) {
          res.json(`Hola ${userInfo.username} Bienvenido a Read Cycle`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
