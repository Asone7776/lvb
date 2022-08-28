import { createSlice } from '@reduxjs/toolkit'
import { calculatePolicy, savePolicy } from '../actions/policeActions';
import { maleOptions, options } from '../../constants';
const initialState = {
    preFormData: null,
    calculatePolicy: {
        loading: false,
        data: null,
        error: null
    },
    savedPolicy: {
        loading: false,
        data: null,
        error: null
    },
    editPolice: null
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        saveEditData: (state, action) => {
            state.editPolice = {
                ...action.payload,
                holder: action.payload.holder ? options.filter((item) => Number(item.value) === Number(action.payload.holder))[0] : options[0],
                male: action.payload.male ? maleOptions.filter((item) => Number(item.value) === Number(action.payload.male))[0] : maleOptions[0],
            }
        },
        resetEditData: (state) => {
            state.editPolice = initialState.editPolice;
        },
        passPreFormData: (state, action) => {
            state.preFormData = action.payload
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
        //Calculate policy
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
        // Save policy
        builder.addCase(savePolicy.pending, (state) => {
            state.savedPolicy = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(savePolicy.fulfilled, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(savePolicy.rejected, (state, action) => {
            state.savedPolicy = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
    },
})

export const { passPreFormData, resetCalculatePolicy, saveEditData, resetEditData } = policeSlice.actions;

export default policeSlice.reducer;