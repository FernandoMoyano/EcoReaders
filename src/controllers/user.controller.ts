import { Request, Response } from 'express'
import { IUser } from '../interfaces/User.interface'
import { UserService } from '../services/user.service'

///Instancia clase UserService
const userService = new UserService()

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const userDate: IUser = req.body
      console.log(userDate)
      const insertUser = await userService.create(userDate)
      return res.json(insertUser)
    } catch (error) {
      console.log(error)
    }
  }
}
