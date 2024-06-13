// STORE. TS
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { bookApi } from './api/api'
import notificationsReducer from '../features/notifications/notificationsSlice'
import authReducer from '../features/auth/authSlice'
import ratingReducer from '../features/rating/ratingSlice'
import booksReducer from '../features/books/booksSlie'

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    notifications: notificationsReducer,
    auth: authReducer,
    ratings: ratingReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
