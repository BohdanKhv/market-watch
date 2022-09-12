import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stockService from "./stockService";

const initialState = {
    globalQuote: [],
    loading: false,
};


export const getGlobalQuote = createAsyncThunk(
    "stock/getGlobalQuote",
    async (symbol, thunkAPI) => {
        try {
            return await stockService.getGlobalQuote(symbol);
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
            state.globalQuote = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGlobalQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.globalQuote.push(action.payload);
            })
            .addCase(getGlobalQuote.rejected, (state) => {
                state.loading = false;
            });
    }
});


export const { resetStock } = stockSlice.actions;

export default stockSlice.reducer;