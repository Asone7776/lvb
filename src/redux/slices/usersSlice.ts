import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/usersActions";
import { usersInitialStateType } from "../../types/users";

const initialState: usersInitialStateType = {
    loading: false,
    data: null,
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.data = null
            state.error = action.payload
        })
    },
});
export default usersSlice.reducer;
