// authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { bookApi } from '../../app/api/api'
import Cookies from 'js-cookie'
import { AuthState } from '../../interfaces/authStateI'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    registerInfo: {
      username: null,
      email: null,
      password: null,
    },
  } as AuthState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },

    logoutSuccess: (state) => {
      state.token = null
      state.user = null
      Cookies.remove('myCookie')
      localStorage.removeItem('userData')
    },

    registerSuccess: (state, action) => {
      state.registerInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token
      state.user = payload.user
    })
  },
})

export const { loginSuccess, logoutSuccess, registerSuccess } = authSlice.actions
export default authSlice.reducer
