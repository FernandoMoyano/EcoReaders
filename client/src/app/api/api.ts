// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { loginSuccess } from '../../features/auth/authSlice'
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
      // Agrega la configuración para manejar la cookie
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled
          const myToken = result.data.accesToken
          // establecer el token en la cookie y almacénarlo en el estado
          const cookie = Cookies.set('myCookie', myToken)

          if (cookie) {
            dispatch(loginSuccess({ token: myToken, user: result.data.user }))
          } else {
            console.error('No se encontró la cookie "myCookie" en la respuesta.')
            dispatch(messageCreated('Cookie "myCookie" no encontrada en la respuesta.'))
          }
        } catch (error) {
          // Manejo de errores
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
  }),
})

export const { useLoginMutation, useLogoutMutation } = bookApi
