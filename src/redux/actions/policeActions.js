import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";

export const calculatePolicy = createAsyncThunk(
    "police/calculatePolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('calculate_policy_lb', data);
            successNotify('Успешно');
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


export const savePolicy = createAsyncThunk(
    "police/savePolicy",
    async (data, { rejectWithValue }) => {
        const { limit, term, holder,email, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post('save_policy_lb', {
                ...data,
                holder: holder.value
            });
            successNotify('Успешно');
            return {
                ...response.data.data,
                limit,
                term,
                holder,
                male,
                'case-0': case0,
                'case-1': case1,
                email
            };
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);


export const updatePolicy = createAsyncThunk(
    "police/updatePolicy",
    async (data, { rejectWithValue }) => {
        const { orderId, limit, term, holder, email, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post(`update_policy_lb/${orderId}`, {
                ...data,
                holder: holder.value
            });
            successNotify('Успешно');
            return {
                ...response.data.data,
                limit,
                term,
                holder,
                male,
                'case-0': case0,
                'case-1': case1,
                email
            };
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);
