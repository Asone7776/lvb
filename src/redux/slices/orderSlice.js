import { createSlice } from "@reduxjs/toolkit"
import { getFirstOrders, changeStatus } from '../actions/orderActions';
const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        loading: false,
        data: [],
        error: null,
        changeStatus: {
            loading: false,
            data: {},
            success: false,
            error: null
        }
    },
    reducers: {
        resetStatus: (state) => {
            state.changeStatus = {
                loading: false,
                data: {},
                success: false,
                error: null
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFirstOrders.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = null;
        })
        builder.addCase(getFirstOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(getFirstOrders.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
        })
        builder.addCase(changeStatus.pending, (state) => {
            state.changeStatus.loading = true;
        })
        builder.addCase(changeStatus.fulfilled, (state, action) => {
            state.changeStatus = {
                loading: false,
                data: action.payload,
                success: true,
                error: null
            }
        })
        builder.addCase(changeStatus.rejected, (state, action) => {
            state.changeStatus = {
                loading: false,
                data: null,
                success: false,
                error: action.payload
            }
        })
    }
});
export const { resetStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
