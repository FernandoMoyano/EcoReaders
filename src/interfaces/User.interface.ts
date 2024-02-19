export interface IUser {
  id: string
  username: string
  email: string
  password: string
}

export type IUserLogin = Omit<IUser, 'id' | 'username'>

export type UserId = string
