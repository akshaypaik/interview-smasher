export const fetchCompanySearchDataRequest = () => ({
    type: "FETCH_COMPANY_SEARCH_DATA_REQUEST"
});

export const fetchDataSuccess = (data) => ({
    type: "FETCH_DATA_SUCCESS",
    payload: data,
});

export const fetchDataFailure = (error) => ({
    type: "FETCH_DATA_FAILURE",
    payload: error,
});

export const deleteDataRequest = () => ({
    type: "DELETE_DATA_REQUEST",
});