import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify } from "../../notifications";
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (args, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.get('users');
            const customOptions = response.data.data && response.data.data.map((item) => {
                return {
                    value: item.id,
                    label: item.email
                }
            })
            return customOptions
        } catch (error) {
            if (error.response.data && error.response.data.error) {
                failureNotify(error.response.data.error);
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error);
        }
    }
);
