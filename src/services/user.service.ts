import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { IUser, UserId } from '../interfaces/User.interface'

export class UserService {
  async create(data: IUser): Promise<ResultSetHeader> {
    const query = 'INSERT INTO users (id,username,email,password) VALUES (?, ?, ?, ?)'
    const values = Object.values(data)
    const [newUser] = await pool.execute(query, values)
    return newUser as ResultSetHeader
  }
  async getOne(id: UserId) {
    const UserId = id
    const query = 'SELECT FROM users WHERE id = ?'
    const [user] = await pool.execute(query, [UserId])
    return user
  }
}
