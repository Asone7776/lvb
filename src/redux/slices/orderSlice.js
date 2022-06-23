import { createSlice } from "@reduxjs/toolkit"
import { getOrders } from '../actions/orderActions';
const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = null;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
        })
    },
});
export default ordersSlice.reducer;
