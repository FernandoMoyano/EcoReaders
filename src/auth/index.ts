import jwt, { Secret } from 'jsonwebtoken'
import { IUser } from '../interfaces/User.interface'

export class Auth {
  //Sign
  sign = (data: IUser) => {
    return jwt.sign(
      {
        username: data.username,
        role: data.role,
      },
      process.env.JWT_TOKEN as string,
      {
        expiresIn: '2hs',
      },
    )
  }

  refreshToken(data: IUser) {
    return jwt.sign(
      {
        username: data.username,
      },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: '1d' },
    )
  }

  //Verify
  async verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as Secret)
    } catch (error) {
      return null
    }
  }
}
