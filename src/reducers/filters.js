import { createReducer } from "@reduxjs/toolkit";

import {
	filtersFetching,
	activeFilterChanged,
	filtersFetched,
	filtersFetchingError,
} from "../actions";

const initialState = {
	filters: [],
	filtersLoadingStatus: "idle",
	activeFilter: "all",
};

const filters = createReducer(initialState, (builder) => {
	builder
		.addCase(filtersFetching, (state) => {
			state.filtersLoadingStatus = "loading";
		})
		.addCase(filtersFetched, (state, action) => {
			state.filtersLoadingStatus = "idle";
			state.filters = action.payload;
		})
		.addCase(activeFilterChanged, (state, action) => {
			state.activeFilter = action.payload;
		})
		.addCase(filtersFetchingError, (state) => {
			state.filtersLoadingStatus = "error";
		})
		.addDefaultCase(() => {});
});

export default filters;
