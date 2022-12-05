import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";

export const calculatePolicy = createAsyncThunk(
    "police/calculatePolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('first/calculate_policy', data);
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

export const calculateSafeCardPolicy = createAsyncThunk(
    "police/calculateSafeCardPolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('second/calculate_policy', data);
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

// Accident insurance
export const saveAccidentPolicy = createAsyncThunk(
    "police/saveAccidentPolicy",
    async (data, { rejectWithValue }) => {
        const { limit, term, holder, email, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post('first/save_policy', {
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


export const updateAccidentPolicy = createAsyncThunk(
    "police/updateAccidentPolicy",
    async (data, { rejectWithValue }) => {
        const { orderId, limit, term, holder, email, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post(`first/update_policy/${orderId}`, {
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

// Card safe
export const saveCardSafePolicy = createAsyncThunk(
    "police/saveCardSafePolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('second/save_policy', data);
            successNotify('Успешно');
            return response.data.data;
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);


export const updateCardSafePolicy = createAsyncThunk(
    "police/updateCardSafePolicy",
    async (data, { rejectWithValue }) => {
        const { orderId, limit, term, holder, email, male } = data;
        const case0 = data['case-0'];
        const case1 = data['case-1'];
        try {
            const response = await axiosAuth.post(`second/update_policy/${orderId}`, {
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


export const calculateDvPolicy = createAsyncThunk(
    "police/calculateDvPolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('third/calculate', data);
            successNotify('Успешно');
            return response.data.data;
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);


export const savePolicy = createAsyncThunk(
    "police/saveDVPolicy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('third/save_policy', data);
            successNotify('Успешно');
            return response.data.data;
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
    "police/updateDVPolicy",
    async (data, { rejectWithValue }) => {
        const { id, ...fields } = data;
        try {
            const response = await axiosAuth.post(`third/update_policy/${id}`, fields);
            successNotify('Успешно обновлено');
            return response.data.data;
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);