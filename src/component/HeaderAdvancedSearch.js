import "./HeaderAdvancedSearch.css";
// import React, { useState, useEffect } from "react";

function HeaderAdvancedSearch({
	// page,
	// setPage,
	// setListOfSearchedMovies,
	// listOfSearchedMovies,
}) {
	// State to store selected options
	// const [searchOptions, setSearchOptions] = useState({
	// 	quality: "all",
	// 	genre: "all",
	// 	rating: "all",
	// 	year: "all",
	// 	language: "all",
	// 	order_by: "latest",
	// });

	// useEffect(() => {
	// 	setPage(1);
	// }, [searchOptions]);

	// useEffect(() => {
	// 	if (listOfSearchedMovies === undefined) {
	// 		setPage(1);
	// 	}
	// 	handleSearch();
	// 	window.scrollTo(0, 0);
	// }, [page]);

	// // Function to handle changes in select dropdowns
	// const handleChange = (e) => {
	// 	if (e) {
	// 		const { name, value } = e.target;
	// 		setSearchOptions((prevOptions) => ({
	// 			...prevOptions,
	// 			[name]: value,
	// 		}));
	// 	}
	// };

	// // Function to handle search
	// const handleSearch = () => {
	// 	if (listOfSearchedMovies === undefined) {
	// 		setPage(1);
	// 	}

	// 	const url = `https://yts.mx/api/v2/list_movies.json?quality=${searchOptions.quality}&genre=${searchOptions.genre}&minimum_rating=${searchOptions.rating}&query_term=${searchOptions.language}&sort_by=date_added&order_by=${searchOptions.order_by}&with_images=true&page=${page}&limit=50`;

	// 	if (url) {
	// 		fetch(url)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				if (data.status === "ok") {
	// 					setListOfSearchedMovies(data.data.movies);
	// 					// console.log(data.data.movies);
	// 				} else {
	// 					console.error("Error fetching movies:", data);
	// 				}
	// 			})
	// 			.catch((error) => console.error("Fetch error:", error));
	// 	}
	// };

	return (
		<div className="headerAdvancedSearch">
			<h1>This page is being updated...</h1>
			<>
				{/* <div className="qualitiesBox">
				<label htmlFor="qualitySelect">Quality:</label>
				<select
					id="qualitySelect"
					className="qualitySelect"
					name="quality"
					value={searchOptions.quality}
					onChange={handleChange}
				>
					<option value="all">All</option>
					<option value="480p">480p</option>
					<option value="720p">720p</option>
					<option value="1080p">1080p</option>
					<option value="1080p.x265">1080p.x265</option>
					<option value="2160p">2160p</option>
					<option value="3D">3D</option>
				</select>
			</div>
			<div className="genresBox">
				<label htmlFor="genreSelect">Genre:</label>
				<select
					id="genreSelect"
					className="genreSelect"
					name="genre"
					value={searchOptions.genre}
					onChange={handleChange}
				>
					<option value="all">All</option>
					<option value="action">Action</option>
					<option value="adventure">Adventure</option>
					<option value="animation">Animation</option>
					<option value="biography">Biography</option>
					<option value="comedy">Comedy</option>
					<option value="crime">Crime</option>
					<option value="documentary">Documentary</option>
					<option value="drama">Drama</option>
					<option value="family">Family</option>
					<option value="fantasy">Fantasy</option>
					<option value="film-noir">Film-Noir</option>
					<option value="game-show">Game-Show</option>
					<option value="history">History</option>
					<option value="horror">Horror</option>
					<option value="music">Music</option>
					<option value="musical">Musical</option>
					<option value="mystery">Mystery</option>
					<option value="news">News</option>
					<option value="reality-tv">Reality-TV</option>
					<option value="romance">Romance</option>
					<option value="sci-fi">Sci-Fi</option>
					<option value="sport">Sport</option>
					<option value="talk-show">Talk-Show</option>
					<option value="thriller">Thriller</option>
					<option value="war">War</option>
					<option value="western">Western</option>
				</select>
			</div>
			<div className="ratingBox">
				<label htmlFor="ratingSelect">Rating:</label>
				<select
					id="ratingSelect"
					className="ratingSelect"
					name="rating"
					value={searchOptions.rating}
					onChange={handleChange}
				>
					<option value="all">All</option>
					<option value="9">9+</option>
					<option value="8">8+</option>
					<option value="7">7+</option>
					<option value="6">6+</option>
					<option value="5">5+</option>
					<option value="4">4+</option>
					<option value="3">3+</option>
					<option value="2">2+</option>
					<option value="1">1+</option>
				</select>
			</div>
			<div className="yearBox">
				<label htmlFor="yearSelect">Year:</label>
				<select
					id="yearSelect"
					className="yearSelect"
					name="year"
					value={searchOptions.year}
					onChange={handleChange}
				>
					<option value="all">All</option>
					<option value="2024">2024</option>
					<option value="2023">2023</option>
					<option value="2020-now">2020-now</option>
					<option value="2010-now">2010-now</option>
					<option value="2010-2019">2010-2019</option>
					<option value="2000-2009">2000-2009</option>
					<option value="1990-1999">1990-1999</option>
					<option value="1980-1989">1980-1989</option>
					<option value="1970-1979">1970-1979</option>
					<option value="1950-1969">1950-1969</option>
					<option value="1900-1949">1900-1949</option>
				</select>
			</div>
			<div className="languageBox">
				<label htmlFor="languageSelect">Language:</label>
				<select
					id="languageSelect"
					className="languageSelect"
					name="language"
					value={searchOptions.language}
					onChange={handleChange}
				>
					<option value="all">All</option>
					<option value="english">English</option>
					<option value="german">German</option>
					<option value="foreign">Foreign</option>
					<option value="arabic">Arabic</option>
					<option value="bengali">Bengali</option>
					<option value="chinese">Chinese</option>
					<option value="dutch">Dutch</option>
					<option value="french">French</option>
					<option value="hindi">Hindi</option>
					<option value="indonesian">Indonesian</option>
					<option value="italian">Italian</option>
					<option value="japanese">Japanese</option>
					<option value="korean">Korean</option>
					<option value="malay">Malay</option>
					<option value="persian">Persian</option>
					<option value="portuguese">Portuguese</option>
					<option value="punjabi">Punjabi</option>
					<option value="russian">Russian</option>
					<option value="spanish">Spanish</option>
					<option value="swahili">Swahili</option>
					<option value="swedish">Swedish</option>
					<option value="tamil">Tamil</option>
					<option value="telugu">Telugu</option>
					<option value="thai">Thai</option>
					<option value="turkish">Turkish</option>
					<option value="urdu">Urdu</option>
					<option value="vietnamese">Vietnamese</option>
					<option value="zulu">Zulu</option>
					<option value="albanian">Albanian</option>
					<option value="amharic">Amharic</option>
					<option value="armenian">Armenian</option>
					<option value="azerbaijani">Azerbaijani</option>
					<option value="basque">Basque</option>
					<option value="belarusian">Belarusian</option>
					<option value="bosnian">Bosnian</option>
					<option value="bulgarian">Bulgarian</option>
					<option value="catalan">Catalan</option>
					<option value="croatian">Croatian</option>
					<option value="czech">Czech</option>
					<option value="danish">Danish</option>
					<option value="estonian">Estonian</option>
					<option value="finnish">Finnish</option>
					<option value="georgian">Georgian</option>
					<option value="greek">Greek</option>
					<option value="hebrew">Hebrew</option>
					<option value="hungarian">Hungarian</option>
					<option value="icelandic">Icelandic</option>
					<option value="kazakh">Kazakh</option>
					<option value="khmer">Khmer</option>
					<option value="kurdish">Kurdish</option>
					<option value="kyrgyz">Kyrgyz</option>
					<option value="latvian">Latvian</option>
					<option value="lithuanian">Lithuanian</option>
					<option value="macedonian">Macedonian</option>
					<option value="mongolian">Mongolian</option>
					<option value="nepali">Nepali</option>
					<option value="norwegian">Norwegian</option>
					<option value="pashto">Pashto</option>
					<option value="romanian">Romanian</option>
					<option value="serbian">Serbian</option>
					<option value="sinhala">Sinhala</option>
					<option value="slovak">Slovak</option>
					<option value="slovenian">Slovenian</option>
					<option value="somali">Somali</option>
					<option value="tajik">Tajik</option>
					<option value="tatar">Tatar</option>
					<option value="turkmen">Turkmen</option>
					<option value="ukrainian">Ukrainian</option>
					<option value="uzbek">Uzbek</option>
					<option value="welsh">Welsh</option>
					<option value="xhosa">Xhosa</option>
				</select>
			</div>
			<div className="orderBox">
				<label htmlFor="orderSelect">Order By:</label>
				<select
					id="orderSelect"
					className="orderSelect"
					name="order_by"
					value={searchOptions.order_by}
					onChange={handleChange}
				>
					<option value="latest">Latest</option>
					<option value="oldest">Oldest</option>
					<option value="featured">Featured</option>
					<option value="seeds">Seeds</option>
					<option value="peers">Peers</option>
					<option value="year">Year</option>
					<option value="imdb_rating">IMDb Rating</option>
					<option value="yts_likes">YTS Likes</option>
					<option value="rt_audience">RT Audience</option>
					<option value="alphabetical">Alphabetical</option>
					<option value="downloads">Downloads</option>
				</select>
			</div>
			<button className="btnSearch" onClick={handleSearch}>
				Search
			</button> */}
			</>
		</div>
	);
}

export default HeaderAdvancedSearch;
