import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import topicReducer from './topicSlice';
import courseReducer from './courseSlice';
import companiesSlice from './companiesSlice';
import dashboardSlice from './dashboardSlice';

const appStore = configureStore({
    reducer: {
        app: appReducer,
        topic: topicReducer,
        course: courseReducer,
        companies: companiesSlice,
        dashboard: dashboardSlice
    }
});

export default appStore;