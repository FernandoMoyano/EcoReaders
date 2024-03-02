// authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { bookApi } from '../../app/api/apiSlice'
import Cookies from 'js-cookie'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logoutSuccess: (state) => {
      state.token = null
      state.user = null

      // Elimina la cookie al cerrar sesión
      Cookies.remove('token')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token
      state.user = payload.user
    })
  },
})

export const { loginSuccess, logoutSuccess } = slice.actions
export default slice.reducer
