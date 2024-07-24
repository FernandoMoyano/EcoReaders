//BOOKS - BOOKSLICE
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewBook } from '../../interfaces/IBook'

//➡️Interface para armar el estado incial extendiendo de NewBook
interface BookWithUsername extends NewBook {
  postedByUser: string
}

//➡️Interface de estado inicial____________
interface bookState {
  publishedBooks: { [bookId: string]: BookWithUsername }
}

//➡️Estado inicial__________________
const initialState: bookState = {
  publishedBooks: JSON.parse(localStorage.getItem('publishedBooks') || '{}'),
}

//➡️Slice________________________
const booksSlice = createSlice({
  name: 'books',

  initialState,

  reducers: {
    //Libros publicados_________________________
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

    //➡️Eliminar libro por id___________________________
    deletePublishedBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload
      delete state.publishedBooks[bookId]
      localStorage.setItem('publishedBooks', JSON.stringify(state.publishedBooks))
    },

    //➡️Acatualizar un libro_________________________
    updatePublishedBook: (state, action: PayloadAction<{ bookId: string; changes: Partial<NewBook> }>) => {
      const { bookId, changes } = action.payload
      state.publishedBooks[bookId] = { ...state.publishedBooks[bookId], ...changes }
      localStorage.setItem('publishedBooks', JSON.stringify(state.publishedBooks))
    },
  },
})

export const { publishedBooks, updatePublishedBook, deletePublishedBook } = booksSlice.actions
export default booksSlice.reducer
