import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companiesSearchResultCache: {},
        companyFilter: "",
        quickCareerLinkFilters: []
    },
    reducers: {
        updateCompaniesSearchResultCache: (state, action) => {
            const searchQuery = action.payload.searchQuery;
            const searchResult = action.payload.searchResult;
            state.companiesSearchResultCache[searchQuery] = searchResult;
        },
        setCompanyFilter: (state, action) => {
            state.companyFilter = action.payload;
        },
        updateQuickCareerLinkFilters: (state, action) => {
            const index = state.quickCareerLinkFilters.findIndex((item) => item.category === action.payload.category &&
                item.filter === action.payload.filter);
            if (index == -1) {
                state.quickCareerLinkFilters.push(action.payload);
            } else {
                state.quickCareerLinkFilters = state.quickCareerLinkFilters.filter((item) => item.category != action.payload.category ||
                    item.filter != action.payload.filter);
            }
        },
        clearQuickCareerLinkFilters: (state, action) => {
            state.quickCareerLinkFilters = [];
        }
    }
});

const setRefetchQuickCareerCompaniesFunction = (refetch) => (dispatch) => {
    // Store the refetch function in a closure
    window.refetchQuickCareerCompanies = refetch;
};

export { setRefetchQuickCareerCompaniesFunction };

export default companiesSlice.reducer;

export const { updateCompaniesSearchResultCache, setCompanyFilter, updateQuickCareerLinkFilters,
    clearQuickCareerLinkFilters
} = companiesSlice.actions;