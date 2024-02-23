import { RowDataPacket } from 'mysql2'

export interface IUser extends RowDataPacket {
  id: string
  username: string
  email: string
  password: string
}

export type IUserLogin = Omit<IUser, 'id' | 'email'>

export type UserId = string
export type authToken = string
