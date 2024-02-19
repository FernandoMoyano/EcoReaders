import { pool } from '../db/connection'

export class AuthService {
  async foundUser(username: string, password: string) {
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
      const [user] = await pool.execute(query, [username, password])
      return user
    } catch (error) {
      console.log(error)
    }
  }
}

//Encontrar un usuario
