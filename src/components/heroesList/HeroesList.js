import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { fetchHeroes } from "../../actions";
import { heroWasRemoved } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	// const filteredHeroes = useSelector((state) => {
	// 	const { heroes, filters } = state;
	// 	console.log("render");
	// 	if (filters.activeFilter === "all") {
	// 		return heroes.heroes;
	// 	} else {
	// 		return heroes.heroes.filter(
	// 			(item) => item.element === filters.activeFilter
	// 		);
	// 	}
	// });

	const filteredHeroesSelector = createSelector(
		(state) => state.filters.activeFilter,
		(state) => state.heroes.heroes,
		(filters, heroes) => {
			if (filters === "all") {
				return heroes;
			} else {
				return heroes.filter((item) => item.element === filters);
			}
		}
	);

	const filteredHeroes = useSelector(filteredHeroesSelector);
	const heroesLoadingStatus = useSelector(
		(state) => state.heroes.heroesLoadingStatus
	);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(fetchHeroes(request));
		// eslint-disable-next-line
	}, []);

	const onDeleteHero = useCallback(
		(id) => {
			request(`http://localhost:3001/heroes/${id}`, "DELETE")
				.then(dispatch(heroWasRemoved(id)))
				.catch((e) => {
					throw new Error(e);
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[request]
	);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return arr.map(({ id, ...props }) => {
			return (
				<HeroesListItem
					key={id}
					onDelete={() => onDeleteHero(id)}
					{...props}
				/>
			);
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
