import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");
const favorite = localStorage.getItem("favorite");
const portfolio = localStorage.getItem("portfolio");

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
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload);
        },
        addToFavorite: (state, action) => {
            state.favorite.push(action.payload);
            localStorage.setItem("favorite", JSON.stringify(state.favorite));
        },
        removeFromFavorite: (state, action) => {
            state.favorite = state.favorite.filter(
                (item) => item !== action.payload
            );
            localStorage.setItem("favorite", JSON.stringify(state.favorite));
        },
        addToPortfolio: (state, action) => {
            state.portfolio.push(action.payload);
            localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
        },
        removeFromPortfolio: (state, action) => {
            state.portfolio = state.portfolio.filter(
                (item) => item !== action.payload
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
    setTheme,
    addToFavorite,
    removeFromFavorite,
    addToPortfolio,
    removeFromPortfolio,
    updateFromPortfolio
} = localSlice.actions;
export default localSlice.reducer;