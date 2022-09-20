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

// const heroesFetching = () => {
// 	return {
// 		type: HEROES_FETCHING,
// 	};
// };

const heroesFetched = createAction(HEROES_FETCHED);

// const heroesFetched = (heroes) => {
// 	return {
// 		type: HEROES_FETCHED,
// 		payload: heroes,
// 	};
// };

const heroesFetchingError = () => {
	return {
		type: HEROES_FETCHING_ERROR,
	};
};

const filtersFetching = () => {
	return {
		type: FILTERS_FETCHING,
	};
};

const filtersFetched = (filters) => {
	return {
		type: FILTERS_FETCHED,
		payload: filters,
	};
};

const activeFilterChanged = (nameFilter) => {
	return { type: ACTIVE_FILTER_CHANGED, payload: nameFilter };
};

// const activeFilterChanged = (nameFilter) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch({ type: ACTIVE_FILTER_CHANGED, payload: nameFilter });
// 	}, 1000);
// };

const filtersFetchingError = () => {
	return {
		type: FILTERS_FETCHING_ERROR,
	};
};

const heroWasAdded = (hero) => {
	return {
		type: HERO_WAS_ADDED,
		payload: hero,
	};
};

const heroWasRemoved = (id) => {
	return {
		type: HERO_WAS_REMOVED,
		payload: id,
	};
};

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
