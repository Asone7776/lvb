import { createSlice } from '@reduxjs/toolkit'
import { calculatePolicy } from '../actions/policeActions';
const initialState = {
    preFormData: {},
    createFormData: {},
    calculatePolicy: {
        loading: false,
        data: null,
        error: null
    }
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
        },
        resetCalculatePolicy: (state) => {
            state.calculatePolicy = {
                loading: false,
                data: null,
                error: null,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calculatePolicy.pending, (state) => {
            state.calculatePolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.fulfilled, (state, action) => {
            state.calculatePolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.rejected, (state, action) => {
            state.calculatePolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
    },
})

export const { passPreFormData, passCreateFormData, resetCalculatePolicy } = policeSlice.actions;

export default policeSlice.reducer;