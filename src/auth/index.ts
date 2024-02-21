import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/User.interface'

export const sign = (data: IUser) => {
  return jwt.sign(data, 'secreto')
}
