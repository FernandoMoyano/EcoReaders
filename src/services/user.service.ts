import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { IUser } from '../interfaces/User.interface'
import bcrypt from 'bcrypt'

export class UserService {
  //Crear usuario
  async create(data: IUser): Promise<ResultSetHeader> {
    const password = await bcrypt.hash(data.password, 5)
    const query = 'INSERT INTO users (username,email,password) VALUES (?, ?, ?)'
    const values = [data.username, data.email, password]

    const [newUser] = await pool.execute(query, values)
    return newUser as ResultSetHeader
  }
}
