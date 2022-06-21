import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'currentUser',
    initialState: {
        loading: false,
        data: {},
        error: null
    },
    reducers: {
        getCurrentUserLoading(state, action) {
            // Use a "state machine" approach for loading state instead of booleans
            state.loading = true
        },
        getCurrentUserSuccess(state, action) {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        getCurrentUserFailure(state, action) {
            state.loading = false
            state.data = {}
            state.error = action.payload
        }
    },
})

// Destructure and export the plain action creators
export const { getCurrentUserLoading, getCurrentUserSuccess, getCurrentUserFailure } = userSlice.actions
export default userSlice.reducer;
// Define a thunk that dispatches those action creators
