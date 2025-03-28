import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        darkMode: true,
        showSidebar: true
    },
    reducers: {
        toogleDarkMode: (state, action) => {
            state.darkMode = !state.darkMode;
        },
        toggleSideBar: (state, action) => {
            state.showSidebar = !state.showSidebar;
        }
    }
});

export default appSlice.reducer;

export const { toogleDarkMode, toggleSideBar } = appSlice.actions;