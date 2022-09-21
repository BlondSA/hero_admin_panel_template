import filters from "../reducers/filters";
import heroes from "../reducers/heroes";
import { configureStore } from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === "string") {
		return next({ type: action });
	}
	return next(action);
};

// const enhancer =
// 	(createStore) =>
// 	(...args) => {
// 		const store = createStore(...args);

// 		const oldDispatch = store.dispatch;
// 		store.dispatch = (action) => {
// 			if (typeof action === "string") {
// 				return oldDispatch({ type: action });
// 			}
// 			return oldDispatch(action);
// 		};
// 		return store;
// 	};

const store = configureStore({
	reducer: { filters, heroes },
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(stringMiddleware);
	},
	devTools: process.env.NODE_ENV !== "production" ? true : false,
});

// const store = createStore(
// 	combineReducers({ filters, heroes }),
// 	compose(
// 		applyMiddleware(ReduxThunk, stringMiddleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 			window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

export default store;
