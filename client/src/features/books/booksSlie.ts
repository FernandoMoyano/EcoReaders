//booksSlice.tsx
import { createSlice } from '@reduxjs/toolkit'

interface bookState {
  published: {
    title: string
    author: string
    publisherId: string
  }
}
const initialState: bookState = {
  published: JSON.parse(localStorage.getItem('publishedBooks') || '{}'),
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    publishedBooks: (state, action) => {
      const { title, author, publisherId } = action.payload
      state.published = { title, author, publisherId }
      localStorage.setItem('publishedBooks', JSON.stringify(action.payload))
    },
  },
})

export const { publishedBooks } = booksSlice.actions
export default booksSlice.reducer
