import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        darkMode: true,
        showSidebar: true,
        searchBarQuery: "",
        showLoginSidebar: false,
        userInfo: {},
        showAvatarDetails: false
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
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state, action) => {
            state.userInfo = {};
        },
        toggleShowAvatarDetails: (state, action) => {
            state.showAvatarDetails = !state.showAvatarDetails;
        }
    }
});

export default appSlice.reducer;

export const {
    toogleDarkMode,
    toggleSideBar,
    updateSearchBarQuery,
    updateShowLoginSidebar,
    setUserInfo,
    removeUser,
    toggleShowAvatarDetails
} = appSlice.actions;