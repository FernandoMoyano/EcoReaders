import { pool } from '../db/connection'
import { IUser } from '../interfaces/User.interface'
import bcrypt from 'bcrypt'

export class AuthService {
  async foundUser(username: string, password: string): Promise<IUser | null> {
    try {
      const query = 'SELECT * FROM users WHERE username = ?'
      const values = [username]
      const [user] = await pool.execute<IUser[]>(query, values)
      if (user.length > 0) {
        const passwordMatch = await bcrypt.compare(password, user[0].password)
        if (passwordMatch) {
          return user[0] as IUser
        }
      }
      return null
    } catch (error) {
      throw error
    }
  }
}
