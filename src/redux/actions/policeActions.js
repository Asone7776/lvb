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
        console.log('data', data);
        const { limit, term, holder, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post('save_policy_lb', data);
            successNotify('Успешно');
            return {
                ...response.data.data,
                limit,
                term,
                holder,
                male,
                'case-0': case0,
                'case-1': case1,
            };
        } catch (error) {
            if (error.response.data && error.response.data.error) {
                failureNotify(error.response.data.error);
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error);
        }
    }
);
