import { createSlice } from "@reduxjs/toolkit";

const companySearchSlice = createSlice({
    name: "companySearch",
    initialState: {
        companySearchData: {
            data: null,
            isLoading: false,
            error: null
        }
    },
    reducers: {
        getCompanySearchAction: (state, action) => {
            state.companySearchData.isLoading = true;
            state.companySearchData.error = '';
        },
        getCompanySearchSuccessAction: (state, action) => {
            state.companySearchData.isLoading = false;
            state.companySearchData.data = action.payload;
        },
        getCompanySearchFailureAction: (state, action) => {
            state.companySearchData.isLoading = false;
            state.companySearchData.error = action.payload;
        }
    }
});

export default companySearchSlice.reducer;

export const { getCompanySearchAction, getCompanySearchSuccessAction, getCompanySearchFailureAction }
    = companySearchSlice.actions; 