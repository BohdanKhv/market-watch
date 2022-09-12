import { configureStore } from '@reduxjs/toolkit';
import localReducer from '../features/local/localSlice';
import stockReducer from '../features/stock/stockSlice';
import searchReducer from '../features/search/searchSlice';


export const store = configureStore({
    reducer: {
        local: localReducer,
        stock: stockReducer,
        search: searchReducer,
    },
    // devTools: false,
});