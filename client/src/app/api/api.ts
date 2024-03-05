// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { loginSuccess, registerSuccess } from '../../features/auth/authSlice'
import { messageCreated } from '../../features/notifications/notificationsSlice'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled
          const myToken = result.data.accesToken
          const cookie = Cookies.set('myCookie', myToken)

          if (cookie) {
            dispatch(loginSuccess({ token: myToken, user: result.data.user }))
          } else {
            console.error('No se encontró la cookie "myCookie" en la respuesta.')
            dispatch(messageCreated('Cookie "myCookie" no encontrada en la respuesta.'))
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error)
          dispatch(messageCreated('Error fetching post!'))
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    register: builder.mutation({
      query: (dataRegister) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...dataRegister },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Manejar el éxito del registro aquí si es necesario
          const result = await queryFulfilled
          dispatch(registerSuccess(result.data)) // Suponiendo que tu endpoint de registro devuelve datos de usuario al registrarse con éxito
        } catch (error) {
          console.error('Error al registrar:', error)
          dispatch(messageCreated('Error al registrar usuario.'))
        }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = bookApi
