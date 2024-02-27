import { ResultSetHeader } from 'mysql2'
import { pool } from '../db/connection'
import { IUser } from '../interfaces/User.interface'
import bcrypt from 'bcrypt'

export class AuthService {
  //Encontrar usuario
  async foundUser(username: string, password: string): Promise<IUser | null> {
    try {
      const query = 'SELECT * FROM users WHERE username = ?'
      const values = [username]
      const [user] = await pool.execute<IUser[]>(query, values)
      if (user.length > 0) {
        const passwordMatch = await bcrypt.compare(password, user[0].password)
        if (passwordMatch) {
          //console.log(passwordMatch)
          return user[0] as IUser
        } else {
          throw new Error('No se Encontraron coincidencias')
        }
      }
      throw new Error('Usuario no registrado')
    } catch (error) {
      throw error
    }
  }

  //Crear usuario
  async create(data: IUser): Promise<ResultSetHeader> {
    try {
      const password = await bcrypt.hash(data.password, 5)
      const query = 'INSERT INTO users (username,email,password) VALUES (?, ?, ?)'
      const values = [data.username, data.email, password]

      const [newUser] = await pool.execute(query, values)
      return newUser as ResultSetHeader
    } catch (error) {
      throw error
    }
  }
}
