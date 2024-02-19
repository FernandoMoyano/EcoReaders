import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { IUser, UserId } from '../interfaces/User.interface'

//Crear usuario
export class UserService {
  async create(data: IUser): Promise<ResultSetHeader> {
    const query = 'INSERT INTO users (id,username,email,password) VALUES (?, ?, ?, ?)'
    const values = Object.values(data)
    const [newUser] = await pool.execute(query, values)
    return newUser as ResultSetHeader
  }

  //Encontrar un usuario
  async foundUser(username: string, password: string) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
    const [user] = await pool.execute(query, [username, password])
    return user
  }
}
