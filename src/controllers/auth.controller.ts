import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

//Instancia AuthService
const authService = new AuthService()

export class AuthController {
  //Login
  async login(req: Request, res: Response) {
    try {
      const userInfo = req.body
      console.log(userInfo)
      const data = await authService.foundUser(userInfo)
      console.log(data)
      if (data[0].username === userInfo.username && data[0].password === userInfo.password) {
        res.json(data)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}
