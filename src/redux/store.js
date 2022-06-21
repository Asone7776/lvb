import { configureStore } from '@reduxjs/toolkit'
import policeReducer from './slices/policeSlice';
export const store = configureStore({
    reducer: {
        police: policeReducer
    }
})

