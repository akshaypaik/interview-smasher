import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        darkMode: true,
        showSidebar: true,
        searchBarQuery: ""
    },
    reducers: {
        toogleDarkMode: (state, action) => {
            state.darkMode = !state.darkMode;
        },
        toggleSideBar: (state, action) => {
            state.showSidebar = !state.showSidebar;
        },
        updateSearchBarQuery: (state, action) => {
            state.searchBarQuery = action.payload;
        }
    }
});

export default appSlice.reducer;

export const { toogleDarkMode, toggleSideBar, updateSearchBarQuery } = appSlice.actions;