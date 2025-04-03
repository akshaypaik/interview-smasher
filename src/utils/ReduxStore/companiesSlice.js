import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companiesSearchResultCache: {}
    },
    reducers: {
        updateCompaniesSearchResultCache: (state, action) => {
            const searchQuery = action.payload.searchQuery;
            const searchResult = action.payload.searchResult;
            state.companiesSearchResultCache[searchQuery] = searchResult;
        }
    }
});

export default companiesSlice.reducer;

export const { updateCompaniesSearchResultCache } = companiesSlice.actions;