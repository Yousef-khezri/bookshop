import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./component/Home";
import Notfound from "./component/Notfound";
import LoginRegister from "./component/LoginRegister";
import DetailsMovie from "./component/DetailsMovie";
import useLocalStorage from "./component/useLocalStorage";
import DetailsUser from "./component/DetailsUser";
import AdvancedSearchPage from "./component/AdvancedSearchPage";
import Footer from "./component/Footer";
import axios from "axios";

function App() {
	const [checkLogin, setCheckLogin] = useState(false);
	const [movie, setMovie] = useState();
	const [user, setUser] = useState();
	const { getFavourites, setFavourites } = useLocalStorage("favourites");
	// It is for all the favorite of all users.
	const [favouriteList, setFavouriteList] = useState([]);
	// This is for all of this user's favorites.
	const [favouriteMovies, setFavouriteMovies] = useState([]);

	const [airdrops, setAirdrops] = useState([]);

	useEffect(() => {
		const fetchAirdrops = async () => {
			try {
				const response = await fetch("http://localhost:3000/airdrops");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setAirdrops(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchAirdrops();
	}, []);

	useEffect(() => {
		console.log(airdrops);
	}, [airdrops]);

	const updateCheckLogin = (user) => {
		setUser(user);
		console.log(user);
		setCheckLogin(true);
	};

	/*-------------- Favourite ----------------- */
	// useEffect(() => {
	// 	if (user && user.userID !== undefined) {
	// 		// console.log(user);
	// 		const favourites = getFavourites();
	// 		setFavouriteList(favourites);
	// 		const userFavourites = favourites.find(
	// 			(fav) => fav.id === user.userID
	// 		);

	// 		if (Array.isArray(userFavourites?.favourites)) {
	// 			setFavouriteMovies(userFavourites.favourites);
	// 		} else {
	// 			const newFavourite = { id: user.userID, favourites: [] }; // Ensure favourites is an array
	// 			const updatedFavourites = [...favourites, newFavourite];
	// 			setFavouriteList(updatedFavourites);
	// 			setFavourites(updatedFavourites);
	// 			setFavouriteMovies([]);
	// 		}
	// 	}
	// }, [user]);

	const addRemoveToFavouriteMovies = (newFavourite) => {
		setFavouriteMovies((prevMovies) => {
			if (!Array.isArray(prevMovies)) {
				prevMovies = [];
			}
			const isFavourite = prevMovies.some(
				(item) => item.id === newFavourite.id
			);
			let updatedMovies;
			if (!isFavourite) {
				updatedMovies = [...prevMovies, newFavourite];
			} else {
				updatedMovies = prevMovies.filter(
					(item) => item.id !== newFavourite.id
				);
			}

			setFavouriteMovies(updatedMovies);
			// Update the favouriteList with the new favouriteMovies for the current user
			setFavouriteList((prevList) => {
				const updatedList = prevList.map((item) =>
					item.id === user.userID
						? { ...item, favourites: updatedMovies }
						: item
				);
				setFavourites(updatedList); // Update local storage
				return updatedList;
			});

			return updatedMovies;
		});
	};

	return (
		<div className="App">
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={
							<Home
								checkLogin={checkLogin}
								airdrops={airdrops}
								user={user}
								setMovie={setMovie}
								movie={movie}
								favouriteMovies={favouriteMovies}
								addRemoveToFavouriteMovies={
									addRemoveToFavouriteMovies
								}
							/>
						}
					/>
					<Route
						path="/login-register"
						element={
							<LoginRegister
								updateCheckLogin={updateCheckLogin}
							/>
						}
					/>
					<Route
						path="/details-user/:username"
						element={<DetailsUser setUser={setUser} user={user} />}
					/>
					<Route
						path="/advanced-search-page"
						element={
							<AdvancedSearchPage
								user={user}
								setMovie={setMovie}
							/>
						}
					/>
					<Route
						path="/airdrop-details/:titleAirdrop"
						element={
							<DetailsMovie
								movie={movie}
								setMovie={setMovie}
								user={user}
								favouriteMovies={favouriteMovies}
								addRemoveToFavouriteMovies={
									addRemoveToFavouriteMovies
								}
							/>
						}
					/>
					<Route path="/*" element={<Notfound />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
