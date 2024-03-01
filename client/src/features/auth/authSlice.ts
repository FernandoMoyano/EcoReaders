import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Define el tipo del estado inicial
interface AuthState {
  token: string | null
  user: string | null // Aquí deberías proporcionar el tipo correcto para el usuario
}

// Define el estado inicial con el tipo que acabas de crear
const initialState: AuthState = {
  token: null,
  user: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: string; accessToken: string }>) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut: (state, action) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
