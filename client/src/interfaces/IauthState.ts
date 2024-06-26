export type IAuthState = {
  userLoggedIn: {
    username: string | null
    token: string | null
    userId: string
  }
  registerInfo: {
    username: null
    email: null
    password: null
  }
}
