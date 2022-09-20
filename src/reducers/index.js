const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	filters: [],
	filtersLoadingStatus: "idle",
	activeFilter: "all",
};

const reducer = (state = initialState, action) => {
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
		case "FILTERS_FETCHING":
			return {
				...state,
				filtersLoadingStatus: "loading",
			};
		case "FILTERS_FETCHED":
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: "idle",
			};
		case "ACTIVE_FILTER_CHANGED":
			return {
				...state,
				activeFilter: action.payload,
			};
		case "FILTERS_FETCHING_ERROR":
			return {
				...state,
				filtersFetchingError: "error",
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

export default reducer;
