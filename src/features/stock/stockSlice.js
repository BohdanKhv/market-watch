import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stockService from "./stockService";

const initialState = {
    searchResults: [],
    loading: false,
};

export const search = createAsyncThunk(
    "stock/search",
    async (query, thunkAPI) => {
        try {
            return await stockService.search(query);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        resetStock: (state) => {
            state.searchResults = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state) => {
                state.loading = true;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(search.rejected, (state) => {
                state.loading = false;
            });
    }
});


export const { resetStock } = stockSlice.actions;

export default stockSlice.reducer;