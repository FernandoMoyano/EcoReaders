//booksSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewBook } from '../../interfaces/BookI'

interface BookWithUsername extends NewBook {
  postedByUser: string
}

interface bookState {
  publishedBooks: { [bookId: string]: BookWithUsername }
}

const initialState: bookState = {
  publishedBooks: JSON.parse(localStorage.getItem('publishedBooks') || '{}'),
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    publishedBooks: (state, action: PayloadAction<{ bookId: string; postedByUser: string; bookDetails: NewBook }>) => {
      try {
        //DEBUG:
        console.log('Datos recibidos en publishedBooks:', action.payload)
        const { bookId, bookDetails, postedByUser } = action.payload
        state.publishedBooks[bookId] = { ...bookDetails, postedByUser }
        //DEBUG:↴
        console.log(postedByUser)

        localStorage.setItem('publishedBooks', JSON.stringify(state.publishedBooks))
      } catch (error) {
        //DEBUG:
        console.log('Error en publishedBooks:', error)
      }
    },
  },
})

export const { publishedBooks } = booksSlice.actions
export default booksSlice.reducer
