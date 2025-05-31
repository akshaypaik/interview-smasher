import { all, fork } from "redux-saga/effects"
import { watchCompanySearch } from "./sagas"

const rootSaga = function* () {
    yield all([
        fork(watchCompanySearch)
    ])
}

export default rootSaga;