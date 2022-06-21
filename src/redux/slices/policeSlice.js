import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    preFormData: {},
    createFormData: {}
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        passPreFormData: (state, action) => {
            state.preFormData = action.payload
        },
        passCreateFormData: (state, action) => {
            state.createFormData = action.payload
        }
    },
})

export const { passPreFormData, passCreateFormData } = policeSlice.actions;

export default policeSlice.reducer;