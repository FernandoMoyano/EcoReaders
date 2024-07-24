export type IAuthState = {
  userLoggedIn: {
    username: string | null
    token: string | null
    userId: string
  }
  registerInfo: {
    username: string | null
    email: string | null
    password: string | null
  }
}
