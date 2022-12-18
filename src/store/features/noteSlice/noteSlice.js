import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    note: [],
    isCreateNoteColor : false,
}

export const noteSlice = createSlice({
  name: 'Side',
  initialState,
  reducers: {
    load: (state, action) => {
      state.note =  action.payload;
    },
    toggleNoteColor: (state) => {
    state.isCreateNoteColor = !state.isCreateNoteColor
    },
    selectAndCreateNote: (state, action) => {
      state.note = [action.payload,...state.note]
    },
    selectedColorSetNote: (state, action) => {
     state.note = action.payload
    }
  },
})

export const { toggleNoteColor,selectAndCreateNote,selectedColorSetNote,load } = noteSlice.actions

export default noteSlice.reducer