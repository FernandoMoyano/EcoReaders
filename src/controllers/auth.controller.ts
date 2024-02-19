import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

//Instancia AuthService
const authService = new AuthService()

export class Authcontroller {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const match = await authService.foundUser(username, password)
      res.status(200).json(match)
    } catch (error) {
      console.log(error)
    }
  }
}
