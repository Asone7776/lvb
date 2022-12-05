import { configureStore } from '@reduxjs/toolkit'
import policeReducer from './slices/policeSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import orderReducer from './slices/orderSlice';
import safeReducer from './slices/safeSlice';
export const store = configureStore({
    reducer: {
        police: policeReducer,
        currentUser: userReducer,
        orders: orderReducer,
        users: usersReducer,
        safe: safeReducer
    }
});