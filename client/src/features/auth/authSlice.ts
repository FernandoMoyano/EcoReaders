// AUTHSLICE.TS
import { createSlice } from '@reduxjs/toolkit'
import { bookApi } from '../../app/api/api'
import Cookies from 'js-cookie'
import { IAuthState } from '../../interfaces/IAuthState'

const getParsedLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : {}
}

const initialState: IAuthState = {
  userLoggedIn: getParsedLocalStorageItem('userLoggedIn'),
  registerInfo: getParsedLocalStorageItem('registerInfo'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //➡️login
    loginSuccess: (state, action) => {
      state.userLoggedIn.token = action.payload.token
      state.userLoggedIn.username = action.payload.user
      state.userLoggedIn.userId = action.payload.userId

      localStorage.setItem('userLoggedIn', JSON.stringify(action.payload))
    },

    //➡️logout
    logoutSuccess: (state) => {
      state.userLoggedIn.token = null
      state.userLoggedIn.username = null
      //quitar la cookie
      Cookies.remove('myCookie')
      //eliminar el item del localStorage
      localStorage.removeItem('userLoggedIn')
    },

    //➡️register
    /* registerSuccess: (state, action) => {
      state.registerInfo = action.payload
      localStorage.setItem('registerInfo', JSON.stringify(action.payload))
    },
  }, */

    registerSuccess: (state, action) => {
      // Verifica qué datos están llegando en `action.payload`
      //DEBUG:
      // authSlice.ts - dentro de registerSuccess
      console.log('Register Success Payload:', action.payload)

      const payload = action.payload
      if (payload) {
        state.registerInfo = {
          username: payload.username || null,
          email: payload.email || null,
          password: payload.password || null,
        }
        localStorage.setItem('registerInfo', JSON.stringify(state.registerInfo))
      } else {
        console.error('Error: `action.payload` is undefined or null')
      }
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.userLoggedIn.token = payload.token
      state.userLoggedIn.username = payload.user
      state.userLoggedIn.userId = payload.userId
    })
  },

  /*   extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.userLoggedIn.token = payload.token
      state.userLoggedIn.username = payload.user
    })
  }, */
})
export const { loginSuccess, logoutSuccess, registerSuccess } = authSlice.actions
export default authSlice.reducer
