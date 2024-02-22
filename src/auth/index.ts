import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/User.interface'
//import { Request } from 'express'
//import { config } from '../config'

//const secret = config.jwt.secret

export class Auth {
  //Sign
  sign = (data: IUser) => {
    return jwt.sign(data, 'secret')
  }
  //Verify
  async verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_TOKEN)
    } catch (error) {
      return null
    }
  }
}
