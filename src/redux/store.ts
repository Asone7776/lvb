import { configureStore } from '@reduxjs/toolkit'
import policeReducer from './slices/policeSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import orderReducer from './slices/orderSlice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
    reducer: {
        police: policeReducer,
        currentUser: userReducer,
        orders: orderReducer,
        users: usersReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 