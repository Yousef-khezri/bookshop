import React from "react";

const useLocalStorage = (key) => {

	// const setProduct = (value) => {
	// 	window.localStorage.setItem("products", JSON.stringify(value));
	// };

	// const getProduct = () => {
	// 	const item = window.localStorage.getItem("products");
	// 	if (item) {
	// 		try {
	// 			return JSON.parse(item);
	// 		} catch (error) {
	// 			console.error("Failed to parse localStorage item", error);
	// 			return "";
	// 		}
	// 	}
	// 	return "";
	// };

	const setItem = (value) => {
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	const getItem = () => {
		const item = window.localStorage.getItem(key);
		if (item) {
			try {
				return JSON.parse(item);
			} catch (error) {
				console.error("Failed to parse localStorage item", error);
				return "";
			}
		}
		return "";
	};

	const setFavourites = (value) => {
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	const getFavourites = () => {
		const item = window.localStorage.getItem(key);
		if (item) {
			try {
				return JSON.parse(item);
			} catch (error) {
				console.error("Failed to parse localStorage item", error);
				return "";
			}
		}
		return "";
	};

	return {
		// setProduct,
		// getProduct,
		setItem,
		getItem,
		setFavourites,
		getFavourites,
	};
};

export default useLocalStorage;
