import { createAction } from "@reduxjs/toolkit";

const HEROES_FETCHING = "HEROES_FETCHING";
const HEROES_FETCHED = "HEROES_FETCHED";
const HERO_WAS_ADDED = "HERO_WAS_ADDED";
const HERO_WAS_REMOVED = "HERO_WAS_REMOVED";
const HEROES_FETCHING_ERROR = "HEROES_FETCHING_ERROR";
const FILTERS_FETCHING = "FILTERS_FETCHING";
const FILTERS_FETCHED = "FILTERS_FETCHED";
const FILTERS_FETCHING_ERROR = "FILTERS_FETCHING_ERROR";
const ACTIVE_FILTER_CHANGED = "ACTIVE_FILTER_CHANGED";

const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request("http://localhost:3001/heroes")
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()));
};

const fetchFilters = (request) => (dispatch) => {
	dispatch(filtersFetching());
	request("http://localhost:3001/filters")
		.then((data) => dispatch(filtersFetched(data)))
		.catch(() => dispatch(filtersFetchingError()));
};

const heroesFetching = createAction(HEROES_FETCHING);
const heroesFetched = createAction(HEROES_FETCHED);
const heroesFetchingError = createAction(HEROES_FETCHING_ERROR);
const filtersFetching = createAction(FILTERS_FETCHING);
const filtersFetched = createAction(FILTERS_FETCHED);
const activeFilterChanged = createAction(ACTIVE_FILTER_CHANGED);
const filtersFetchingError = createAction(FILTERS_FETCHING_ERROR);
const heroWasAdded = createAction(HERO_WAS_ADDED);
const heroWasRemoved = createAction(HERO_WAS_REMOVED);

export {
	activeFilterChanged,
	fetchFilters,
	fetchHeroes,
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
	heroWasAdded,
	heroWasRemoved,
};
