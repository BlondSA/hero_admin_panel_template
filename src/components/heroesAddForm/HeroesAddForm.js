import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import store from "../../store";
import { selectAll } from "../heroesFilters/heroesFiltersSlice";
import { useCreateHeroesMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
	const { filtersLoadingStatus } = useSelector((state) => state.filters);
	const filters = selectAll(store.getState());
	const [heroName, setHeroName] = useState("");
	const [heroDescription, setHeroDescription] = useState("");
	const [heroElement, setHeroElement] = useState("default");
	const [createHero] = useCreateHeroesMutation();

	const hero = {
		id: uuidv4(),
		name: heroName,
		description: heroDescription,
		element: heroElement,
	};

	const clearForm = () => {
		setHeroName("");
		setHeroDescription("");
		setHeroElement("default");
	};

	const onSubmit = (evt) => {
		evt.preventDefault();
		createHero(hero).unwrap();
		clearForm();
	};

	const renderFilters = (filters, status) => {
		if (status === "loading") {
			return <option>Загрузка элементов</option>;
		} else if (status === "error") {
			return <option>Ошибка загрузки</option>;
		}

		if (filters && filters.length > 0) {
			return filters.map((item) => {
				const { name, label } = item;
				if (name === "all") {
					// eslint-disable-next-line array-callback-return
					return;
				}
				return (
					<option key={name} value={name}>
						{label}
					</option>
				);
			});
		}
	};

	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">
					Имя нового героя
				</label>
				<input
					required
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?"
					value={heroName}
					onChange={(e) => setHeroName(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">
					Описание
				</label>
				<textarea
					required
					name="text"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{ height: "130px" }}
					value={heroDescription}
					onChange={(e) => setHeroDescription(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">
					Выбрать элемент героя
				</label>
				<select
					required
					className="form-select"
					id="element"
					name="element"
					value={heroElement}
					onChange={(e) => setHeroElement(e.target.value)}
				>
					<option value="">Я владею элементом...</option>
					{renderFilters(filters, filtersLoadingStatus)}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">
				Создать
			</button>
		</form>
	);
};

export default HeroesAddForm;
