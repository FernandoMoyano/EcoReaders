// AUTHSLICE.TS
import { createSlice } from '@reduxjs/toolkit'
import { bookApi } from '../../app/api/api'
import Cookies from 'js-cookie'
import { IAuthState } from '../../interfaces/IAuthState'

const initialState: IAuthState = {
  userLoggedIn: JSON.parse(localStorage?.getItem('userLoggedIn') || '{}'),
  registerInfo: JSON.parse(localStorage?.getItem('registerInfo') || '{}'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //login
    loginSuccess: (state, action) => {
      state.userLoggedIn.token = action.payload.token
      state.userLoggedIn.username = action.payload.user
      state.userLoggedIn.userId = action.payload.userId

      localStorage.setItem('userLoggedIn', JSON.stringify(action.payload))
    },

    //logout
    logoutSuccess: (state) => {
      state.userLoggedIn.token = null
      state.userLoggedIn.username = null
      //quitar la cookie
      Cookies.remove('myCookie')
      //eliminar el item del localStorage
      localStorage.removeItem('userLoggedIn')
    },

    //register
    registerSuccess: (state, action) => {
      state.registerInfo = action.payload
      localStorage.setItem('registerInfo', JSON.stringify(action.payload))
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.userLoggedIn.token = payload.token
      state.userLoggedIn.username = payload.user
    })
  },
})

export const { loginSuccess, logoutSuccess, registerSuccess } = authSlice.actions
export default authSlice.reducer
