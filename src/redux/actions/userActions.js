import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault, axiosAuth } from '../../axios-instances';
import Cookies from "js-cookie";
import { failureNotify, successNotify } from "../../notifications";
export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async () => {
        const response = await axiosAuth.get('user');
        return response.data;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosDefault.post('auth', data);
            Cookies.set('token', response.data.data.token);
            successNotify('Вы успешно авторизованы');
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


