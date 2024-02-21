import { pool } from '../db/connection'
import { IUser, IUserLogin } from '../interfaces/User.interface'

export class AuthService {
  async foundUser(data: IUserLogin): Promise<IUser[]> {
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
      const [user] = await pool.execute<IUser[]>(query, [data.username, data.password])
      return user
    } catch (error) {
      throw error
    }
  }
}
