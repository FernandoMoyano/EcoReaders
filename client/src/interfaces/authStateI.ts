export type AuthState = {
  user: string | null
  token: string | null
  userId: string | null
  registerInfo: {
    username: null
    email: null
    password: null
  }
}
