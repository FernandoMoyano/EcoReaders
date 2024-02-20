export interface IUser {
  id: string
  username: string
  email: string
  password: string
}

export type IUserLogin = Omit<IUser, 'id' | 'email'>

export type UserId = string
