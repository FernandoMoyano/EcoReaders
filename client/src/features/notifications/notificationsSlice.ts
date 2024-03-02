// notificationsSlice.ts
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
    messageCreated: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { messageCreated, clearMessages } = notificationsSlice.actions
export default notificationsSlice.reducer
