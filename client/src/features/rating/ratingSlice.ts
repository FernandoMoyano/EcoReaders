//RATING - RATINGSLICE
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RatingState {
  ratings: { [bookId: string | number]: number }
}

const initialState: RatingState = {
  ratings: JSON.parse(localStorage.getItem('ratings') || '{}'),
}

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ bookId: string | number; rating: number }>) => {
      const { bookId, rating } = action.payload
      state.ratings[bookId] = rating
      localStorage.setItem('ratings', JSON.stringify(state.ratings))
    },
  },
})

export const { setRating } = ratingSlice.actions
export default ratingSlice.reducer
