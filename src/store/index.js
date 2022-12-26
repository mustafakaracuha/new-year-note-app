import { configureStore } from '@reduxjs/toolkit'
import note from './features/noteSlice/noteSlice';



export const store = configureStore({
  reducer: {
    note,
  },
})