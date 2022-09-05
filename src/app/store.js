import { configureStore } from '@reduxjs/toolkit';
import localReducer from '../features/local/localSlice';


export const store = configureStore({
    reducer: {
        local: localReducer,
    },
    // devTools: false,
});