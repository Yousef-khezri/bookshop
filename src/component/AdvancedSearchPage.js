import "./AdvancedSearchPage.css";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeaderAdvancedSearch from "./HeaderAdvancedSearch";
import BoxOfMovies from "./BoxOfMovies";

function AdvancedSearchPage({ user, setMovie }) {
	const [page, setPage] = useState(1);
	const [listOfSearchedMovies, setListOfSearchedMovies] = useState([]);

	/* ------ Test -------------- */
	// useEffect(() => {
	// 	console.log(page);
	// 	console.log(listOfSearchedMovies);
	// 	if(listOfSearchedMovies === undefined){
	// 		setPage(1);
	// 	}
	// }, [page]);
	/* ------ End test ---------- */

	// useEffect(() => {
	// 	console.log(listOfSearchedMovies);
	// }, [listOfSearchedMovies]);

	return (
		<div className="advancedSearchPage">
			<Navbar user={user} />
			<HeaderAdvancedSearch
				page={page}
				setPage={setPage}
				setListOfSearchedMovies={setListOfSearchedMovies}
				listOfSearchedMovies={listOfSearchedMovies}
			/>
			{listOfSearchedMovies !== undefined &&
			listOfSearchedMovies.length !== 0 ? (
				<BoxOfMovies
					listOfSearchedMovies={listOfSearchedMovies}
					setPage={setPage}
					page={page}
					setMovie={setMovie}
				/>
			) : listOfSearchedMovies === undefined ? (
				<h1 className="error">
					No movies found with your selected options.
				</h1>
			) : null}
		</div>
	);
}

export default AdvancedSearchPage;
