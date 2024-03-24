//booksSlice.tsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  published: {
    title: '',
    author: '',
  },
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    publishBooks: (state, action) => {
      state.published.title = action.payload
      state.published.author = action.payload
    },
  },
})

export const { publishBooks } = booksSlice.actions
export default booksSlice.reducer
