import { configureStore } from '@reduxjs/toolkit';
import localReducer from '../features/local/localSlice';
import stockReducer from '../features/stock/stockSlice';


export const store = configureStore({
    reducer: {
        local: localReducer,
        stock: stockReducer,
    },
    // devTools: false,
});