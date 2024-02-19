/* import { RowDataPacket } from 'mysql2' */
import { RowDataPacket } from 'mysql2'
import { pool } from '../db/connection'
import { IUserLogin } from '../interfaces/User.interface'

export class AuthService {
  async foundUser(data: IUserLogin) {
    try {
      const query = 'SELECT * FROM users WHERE email = ? AND password = ?'
      const [user] = await pool.execute<RowDataPacket[]>(query, [data.email, data.password])
      return user as RowDataPacket[]
    } catch (error) {
      console.log(error)
    }
  }
}
