import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeFilter: "all",
	filters: [],
	filtersLoadingStatus: "idle",
};

const filtersSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload;
		},
		filtersFetched: (state, action) => {
			state.filtersLoadingStatus = "idle";
			state.filters = action.payload;
		},
		filtersFetching: (state) => {
			state.filtersLoadingStatus = "loading";
		},
		filtersFetchingError: (state) => {
			state.filtersLoadingStatus = "error";
		},
	},
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
	activeFilterChanged,
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} = actions;
