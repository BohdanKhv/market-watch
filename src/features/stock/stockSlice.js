import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stockService from "./stockService";

const initialState = {
    globalQuote: [],
    sharedStocks: [],
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
            state.sharedStocks = [];
            state.loading = false;
        },
        resetSharedStocks: (state) => {
            state.sharedStocks = [];
        },
        setSharedStocks: (state, action) => {
            state.sharedStocks = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGlobalQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.globalQuote.push(action.payload);

                if(action.payload) {
                    let item = action.payload;
                    state.sharedStocks = state.sharedStocks.map((sharedItem) => {
                        if (sharedItem.symbol.toLowerCase() === item.symbol.toLowerCase()) {
                            sharedItem.price = item.c;
                            sharedItem.change = item.d;
                            sharedItem.changePercent = item.dp;
                            sharedItem.open = item.o;
                            sharedItem.high = item.h;
                            sharedItem.low = item.l;
                        }
                        return sharedItem;
                    });
                }
            })
            .addCase(getGlobalQuote.rejected, (state) => {
                state.loading = false;
            });
    }
});


export const { resetStock, resetSharedStocks, setSharedStocks } = stockSlice.actions;

export default stockSlice.reducer;