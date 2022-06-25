import { createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../actions/usersActions"
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
            state.data = {};
            state.error = null;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.data = {}
            state.error = action.payload
        })
    },
});
export default usersSlice.reducer;
