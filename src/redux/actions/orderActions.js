import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
export const getOrders = createAsyncThunk(
    "orders/all",
    async () => {
        const response = await axiosAuth.get('orders');
        return response.data;
    }
);



