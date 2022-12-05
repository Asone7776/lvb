import { createSlice } from "@reduxjs/toolkit";
import { tariffs } from "../../constants";

const initialState = {
    data: tariffs[0]
}
console.log(initialState);
//TODO: Remove default value
const safeSlice = createSlice({
    name: 'safe',
    initialState,
    reducers: {
        saveItem: (state, action) => {
            state.data = action.payload;
        },
        resetSafe: (state) => {
            state.data = null;
        }
    }
});
export const { resetSafe, saveItem } = safeSlice.actions;
export default safeSlice.reducer;
