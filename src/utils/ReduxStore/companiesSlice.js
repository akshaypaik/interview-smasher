import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companiesSearchResultCache: {},
        companyFilter: ""
    },
    reducers: {
        updateCompaniesSearchResultCache: (state, action) => {
            const searchQuery = action.payload.searchQuery;
            const searchResult = action.payload.searchResult;
            state.companiesSearchResultCache[searchQuery] = searchResult;
        },
        setCompanyFilter: (state, action) => {
            state.companyFilter = action.payload;
        }
    }
});

const setRefetchQuickCareerCompaniesFunction = (refetch) => (dispatch) => {
    // Store the refetch function in a closure
    window.refetchQuickCareerCompanies = refetch;
};

export { setRefetchQuickCareerCompaniesFunction };

export default companiesSlice.reducer;

export const { updateCompaniesSearchResultCache, setCompanyFilter } = companiesSlice.actions;