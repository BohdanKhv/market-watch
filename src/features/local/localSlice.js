import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");

const initialState = {
    theme: theme || "light",
};

export const localSlice = createSlice({
    name: "local",
    initialState,
    reducers: {
        resetLocal: (state) => {
            state.theme = "light";
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload);
        },
    },
});

export const { resetLocal, setTheme } = localSlice.actions;
export default localSlice.reducer;