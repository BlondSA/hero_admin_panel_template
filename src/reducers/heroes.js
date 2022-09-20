// import { createReducer } from "@reduxjs/toolkit";

// import {
// 	heroesFetched,
// 	heroesFetching,
// 	heroesFetchingError,
// 	heroWasAdded,
// 	heroWasRemoved,
// } from "../actions/index";

const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
};

// const heroes = createReducer(initialState, (builder) => {
// 	builder.addCase()
// });

const heroes = (state = initialState, action) => {
	switch (action.type) {
		case "HEROES_FETCHING":
			return {
				...state,
				heroesLoadingStatus: "loading",
			};
		case "HEROES_FETCHED":
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: "idle",
			};
		case "HEROES_FETCHING_ERROR":
			return {
				...state,
				heroesLoadingStatus: "error",
			};
		case "HERO_WAS_REMOVED":
			return {
				...state,
				heroes: state.heroes.filter(
					(hero) => hero.id !== action.payload
				),
			};
		case "HERO_WAS_ADDED":
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			};
		default:
			return state;
	}
};

export default heroes;
