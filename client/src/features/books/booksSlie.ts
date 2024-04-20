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
    publishedBooks: (state, action: PayloadAction<{ bookId: string; bookDetails: NewBook; postedByUser: string }>) => {
      try {
        //DEBUG:
        console.log('Datos recibidos en publishedBooks:', action.payload)
        const { bookId, bookDetails, postedByUser } = action.payload
        state.publishedBooks[bookId] = { ...bookDetails, postedByUser }
        //DEBUG:
        console.log(postedByUser)

        localStorage.setItem('publishedBooks', JSON.stringify(state.publishedBooks))
      } catch (error) {
        //DEBUG:
        console.log('Error en publishedBooks:', error)
      }
    },

    //Elimina libro por medio del id recibido
    deletePublishedBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload
      delete state.publishedBooks[bookId]
      localStorage.setItem('publishedBooks', JSON.stringify(state.publishedBooks))
    },
  },
})

export const { publishedBooks, deletePublishedBook } = booksSlice.actions
export default booksSlice.reducer
