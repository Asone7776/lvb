import { createSlice } from "@reduxjs/toolkit"
import { userInitialStateType } from "../../types/user";
import { getCurrentUser, login } from "../actions/userActions";

const initialState: userInitialStateType = {
    loading: false,
    data: null,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false
            state.data = null;
            state.error = action.payload
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
            state.success = false;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.success = true;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            state.success = false;
        })
    },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
