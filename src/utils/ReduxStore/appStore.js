import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

const appStore = configureStore({
    reducer: {
        app: appReducer
    }
});

export default appStore;