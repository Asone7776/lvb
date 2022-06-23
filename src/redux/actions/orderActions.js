import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
export const getOrders = createAsyncThunk(
    "orders/all",
    async (params) => {
        const response = await axiosAuth.get('orders', {
            params
        });
        return response.data;
    }
);



