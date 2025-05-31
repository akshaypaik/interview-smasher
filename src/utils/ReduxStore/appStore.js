import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appSlice';
import topicReducer from './topicSlice';
import courseReducer from './courseSlice';
import companiesSlice from './companiesSlice';
import dashboardSlice from './dashboardSlice';
import companySearchSlice from './companySearchSlice';
import rootSaga from './ReduxSaga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
    reducer: {
        app: appReducer,
        topic: topicReducer,
        course: courseReducer,
        companies: companiesSlice,
        dashboard: dashboardSlice,
        companySearch: companySearchSlice
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware
    ]
});

sagaMiddleware.run(rootSaga);

export default appStore;