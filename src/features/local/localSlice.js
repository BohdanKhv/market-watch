import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");
const favorite = JSON.parse(localStorage.getItem("favorite"));
const portfolio = JSON.parse(localStorage.getItem("portfolio"));

const initialState = {
    theme: theme || "light",
    favorite: favorite || [],
    portfolio: portfolio || [],
};

export const localSlice = createSlice({
    name: "local",
    initialState,
    reducers: {
        resetLocal: (state) => {
            state.theme = "light";
        },
        resetData: (state) => {
            state.favorite = [];
            state.portfolio = [];
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload);
        },
        addToFavorite: (state, action) => {
            const index = state.favorite.findIndex(
                (item) => item.symbol === action.payload.symbol
            );
            if(index === -1) {
                state.favorite.push(action.payload);
                localStorage.setItem("favorite", JSON.stringify(state.favorite));
            }
        },
        removeFromFavorite: (state, action) => {
            state.favorite = state.favorite.filter(
                (item) => item.symbol !== action.payload.symbol
            );
            localStorage.setItem("favorite", JSON.stringify(state.favorite));
        },
        addToPortfolio: (state, action) => {
            const index = state.portfolio.findIndex(
                (item) => item.symbol === action.payload.symbol
            );
            if(index === -1) {
                state.portfolio.push(action.payload);
                localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
            }
        },
        removeFromPortfolio: (state, action) => {
            state.portfolio = state.portfolio.filter(
                (item) => item.symbol !== action.payload.symbol
            );
            localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
        },
        updateFromPortfolio: (state, action) => {
            state.portfolio = state.portfolio.map((item) => {
                if (item.symbol === action.payload.symbol) {
                    return action.payload;
                }
                return item;
            });
            localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
        }
    },
});

export const {
    resetLocal, 
    resetData,
    setTheme,
    addToFavorite,
    removeFromFavorite,
    addToPortfolio,
    removeFromPortfolio,
    updateFromPortfolio
} = localSlice.actions;
export default localSlice.reducer;