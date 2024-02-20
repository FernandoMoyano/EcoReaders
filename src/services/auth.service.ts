import { RowDataPacket } from 'mysql2'
import { pool } from '../db/connection'
import { IUserLogin } from '../interfaces/User.interface'

export class AuthService {
  async foundUser(data: IUserLogin): Promise<RowDataPacket[]> {
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
      const [user] = await pool.execute<RowDataPacket[]>(query, [data.username, data.password])
      return user
    } catch (error) {
      throw error
    }
  }
}
