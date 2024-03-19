// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { loginSuccess, registerSuccess } from '../../features/auth/authSlice'
import { messageCreated } from '../../features/notifications/notificationsSlice'
import { BookI, GetBooks } from '../../interfaces/BookI'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const myToken = data.accesToken
          //console.log(myToken)
          Cookies.set('myCookie', myToken)

          if (myToken) {
            dispatch(loginSuccess({ token: myToken, user: data.username }))
          } else {
            console.error('No se encontró la cookie "myCookie" en la respuesta.')
            dispatch(messageCreated('Cookie "myCookie" no encontrada en la respuesta.'))
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error)
          dispatch(messageCreated('Error al iniciar sesión.'))
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
        body: dataRegister,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(registerSuccess(data))
        } catch (error) {
          console.error('Error al registrar:', error)
          dispatch(messageCreated('Error al registrar usuario.'))
        }
      },
    }),

    getBooks: builder.query<GetBooks, void>({
      query: () => '/books',
    }),

    getBook: builder.query<BookI[], string>({
      query: (id) => `/books/${id}`,
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetBooksQuery, useGetBookQuery } = bookApi
