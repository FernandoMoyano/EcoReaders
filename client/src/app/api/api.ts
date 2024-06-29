// API.TS
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { loginSuccess, registerSuccess } from '../../features/auth/authSlice'
import { messageCreated } from '../../features/notifications/notificationsSlice'
import { IBook, GetBooks } from '../../interfaces/IBook'
import { publishedBooks } from '../../features/books/booksSlie'
import { IDataRegister } from '../../interfaces/IDataRegister'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),

  endpoints: (builder) => ({
    //login________________________________

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      //Tratamiento y extracción de la data
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          //DEBUG:
          console.log(data)
          const myToken = data.accesToken
          //DEBUG:
          console.log(myToken)
          Cookies.set('myCookie', myToken)
          if (myToken) {
            dispatch(loginSuccess({ token: myToken, user: data.username, userId: data.id }))
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

    //logout__________________________

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    //registro________________________________________

    register: builder.mutation({
      query: (dataRegister: IDataRegister) => ({
        url: '/auth/register',
        method: 'POST',
        body: dataRegister,
      }),
      //Tratamiento y extracción de la data
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

    //Obtener todos los libros_________________

    getBooks: builder.query<GetBooks, void>({
      query: () => '/books',
    }),

    //Obtener un libro________________________

    getBook: builder.query<IBook[], string>({
      query: (id) => `/books/${id}`,
    }),

    //Obtener libros por un usuario específico____________

    getMyPublishedBooks: builder.query<IBook[], string>({
      query: (userId) => `/books/user/${userId}/my-books`,
      transformResponse: (response: { message: string; data: IBook[] }) => response.data,
    }),

    //Editar un libro ya publicado________________________

    updateBook: builder.mutation<IBook, { userId: string; bookId: string; editedBook: Partial<IBook> }>({
      query: ({ editedBook, userId, bookId }) => ({
        url: `/books/user/${userId}/edit/${bookId}`,
        method: 'PATCH',
        body: editedBook,
      }),
    }),

    //Publicar un libro________________________

    postNewBook: builder.mutation({
      query: (dataNewBook) => ({
        url: '/books/new',
        method: 'POST',
        body: dataNewBook,
      }),
      //Tratamiento y extracción de la data
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          //DEBUG:
          console.log('Data recibida de la API:', data)
          const bookId = data.result.bookId
          const bookDetails = data.result.bookDetails
          const postedByUser = data.result.publishedBy[0].username
          //DEBUG:
          console.log('Detalles del libro recibido:', postedByUser)
          dispatch(publishedBooks({ bookId, bookDetails, postedByUser }))
        } catch (error) {
          console.error('Error al registrar:', error)
          dispatch(messageCreated('Error al publicar el libro.'))
        }
      },
    }),

    //Eliminar un libro____________________

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  usePostNewBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  useGetMyPublishedBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi
