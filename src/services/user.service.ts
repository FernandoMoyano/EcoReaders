import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { IUser } from '../interfaces/User.interface'

export class UserService {
  //Crear usuario
  async create(data: IUser): Promise<ResultSetHeader> {
    const query = 'INSERT INTO users (username,email,password) VALUES (?, ?, ?)'
    const values = Object.values(data)
    const [newUser] = await pool.execute(query, values)
    return newUser as ResultSetHeader
  }
}
