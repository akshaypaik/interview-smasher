import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        currentCourse: ""
    },
    reducers: {
        updateCurrentCourse: (state, action) => {
            state.currentCourse = action.payload;
        }
    }
});

export default courseSlice.reducer;

export const { updateCurrentCourse } = courseSlice.actions;