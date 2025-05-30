import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        userDashboardGraphData: {}
    },
    reducers: {
        updateUserDashboardGraphData: (state, action) => {
            state.userDashboardGraphData = action.payload;
        }
    }
});

export default dashboardSlice.reducer;

export const { updateUserDashboardGraphData } = dashboardSlice.actions;