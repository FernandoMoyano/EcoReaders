export type AuthState = {
  userLoggedIn: {
    username: string | null
    token: string | null
    userId: string | null
  }
  registerInfo: {
    username: null
    email: null
    password: null
  }
}
