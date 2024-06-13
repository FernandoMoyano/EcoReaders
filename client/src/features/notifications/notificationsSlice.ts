// NOTIFICATIONS - NOTIFICATIONSSLICE
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationsState {
  messages: string[]
}

const initialState: NotificationsState = {
  messages: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotication: (state, action) => {
      state.messages.push(action.payload)
    },

    messageCreated: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload)
    },

    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { messageCreated, clearMessages, createNotication } = notificationsSlice.actions
export default notificationsSlice.reducer
