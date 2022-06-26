import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";
export const getOrders = createAsyncThunk(
    "orders/all",
    async (params) => {
        const response = await axiosAuth.get('orders', {
            params
        });
        return response.data;
    }
);

export const changeStatus = createAsyncThunk(
    "orders/changeStatus",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.patch(`orders`, params);
            successNotify(response.data.data);
            return response.data.data;
        } catch (error) {
            if (error.response.data && error.response.data.error) {
                failureNotify(error.response.data.error);
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error);
        }
    }
);

