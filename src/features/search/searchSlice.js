import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchService from "./searchService";

const initialState = {
    searchResults: [],
    loading: false,
};

export const search = createAsyncThunk(
    "search/getSearchResults",
    async (query, thunkAPI) => {
        try {
            return await searchService.search(query);
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



const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearch: (state) => {
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
                state.searchResults = action.payload.bestMatches ? action.payload.bestMatches : [];
            })
            .addCase(search.rejected, (state) => {
                state.loading = false;
            });
    }
});


export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;