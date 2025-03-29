import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import topicReducer from './topicSlice';
import courseReducer from './courseSlice';

const appStore = configureStore({
    reducer: {
        app: appReducer,
        topic: topicReducer,
        course: courseReducer
    }
});

export default appStore;