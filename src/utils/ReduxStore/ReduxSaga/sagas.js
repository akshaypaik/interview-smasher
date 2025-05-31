import { debounce, put, takeLatest } from "redux-saga/effects";
import * as actions from './actions';
import { getCompanySearchFailureAction, getCompanySearchSuccessAction } from "../companySearchSlice";
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW } from "../../constants/apiConstants";

function* getCompanySearchData(action){
    try{
        const { data } = yield call(GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW, action.searchQuery);
        yield put(getCompanySearchSuccessAction(data));
    }catch(error){
        yield put(getCompanySearchFailureAction(error));
    }
}

export function* watchCompanySearch() {
    yield debounce(500, actions.fetchCompanySearchDataRequest, getCompanySearchData);
}
