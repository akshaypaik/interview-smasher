import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        darkMode: true,
        showSidebar: true,
        searchBarQuery: "",
        showLoginSidebar: false
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
        },
        updateShowLoginSidebar: (state, action) => {
            state.showLoginSidebar = action.payload;
        }
    }
});

export default appSlice.reducer;

export const { toogleDarkMode, toggleSideBar, updateSearchBarQuery, updateShowLoginSidebar } = appSlice.actions;