import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
    name: "topic",
    initialState: {
        currentTopic: {}
    },
    reducers: {
        //Not used currently
        updateCurrentTopic: (state, action) => {
            state.currentTopic = action.payload;
        }
    }
});

export default topicSlice.reducer;

export const { updateCurrentTopic } = topicSlice.actions;