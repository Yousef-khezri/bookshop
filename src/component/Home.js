import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import MenuHome from "./MenuHome";
import ImageSlider from "./ImageSlider";

export default function Home({
	checkLogin,
	airdrops,
	setMovie,
	movie,
	user,
	favouriteMovies,
	addRemoveToFavouriteMovies,
}) {
	const [labelPage, setLabelPage] = useState("Airdrops");
	// const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const handleLoginRegisterClick = () => {
		navigate("/login-register");
	};

	const handleAirdropItemClick = (airdrop) => {
		setMovie(airdrop);
		navigate(`/airdrop-details/${airdrop.airdropName}`);
	};

	// useEffect(() => {
	// 	if (labelPage === "Favourites") {
	// 		setMovies(favouriteMovies);
	// 	} else {
	// 		let url = "";

	// 		if (labelPage === "New Releases") {
	// 			url = `https://yts.mx/api/v2/list_movies.json?sort_by=date_added&order_by=desc&with_images=true&with_cast=true&page=${page}&limit=20`;
	// 		} else if (labelPage === "Trending") {
	// 			url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year&with_images=true&with_cast=true&page=${page}&limit=20`;
	// 		} else if (labelPage === "Coming Soon") {
	// 			url = `https://yts.mx/api/v2/list_movies.json?status=upcoming&sort_by=year&with_images=true&with_cast=true&page=${page}&limit=20`;
	// 		}

	// 		if (url) {
	// 			fetch(url)
	// 				.then((response) => response.json())
	// 				.then((data) => {
	// 					if (data.status === "ok") {
	// 						setMovies(data.data.movies);
	// 					} else {
	// 						console.error("Error fetching movies:", data);
	// 					}
	// 				})
	// 				.catch((error) => console.error("Fetch error:", error));
	// 		}
	// 	}
	// }, [labelPage, page]);

	return (
		<div className="page">
			{!checkLogin ? (
				<div className="home_Page">
					<div className="header_HomePage">
						<div className="Logo">
							<h1>Joseph Media</h1>
						</div>
						<button
							className="btn_LoginRegister"
							onClick={handleLoginRegisterClick}
						>
							Login/Register
						</button>
					</div>
					<div className="main_HomePage">
						<div className="boxTitle">
							<h1>Welcome</h1>
							<h1>To web Airdrops</h1>
							<h1>Please register an account</h1>
						</div>
						<ImageSlider airdrops={airdrops} />
					</div>
				</div>
			) : (
				<div className="homePageAccount">
					<Navbar user={user} setMovie={setMovie} movie={movie} />
					<div className="main">
						<MenuHome
							setLabelPage={setLabelPage}
							setPage={setPage}
						/>
						<div className="boxOfMovies">
							<h1 className="titelBoxOfMovies">{labelPage}</h1>
							<div className="moviesList">
								{airdrops
									? airdrops.map((airdrop, index) => (
											<div
												key={index}
												className="movieItem"
												onClick={() =>
													handleAirdropItemClick(
														airdrop
													)
												}
											>
												{/* <div className="rating">
													{movie.rating}
												</div> */}
												<img
													src={`${airdrop.airdropImg}`}
													alt={airdrop.airdropName}
												/>
												<div className="detailsMovieItem">
													<div className="titleMoviItem">
														<h4>
															{
																airdrop.airdropName
															}
														</h4>
														{/* <h5>
															{movie.genres.join(
																", "
															)}
														</h5> */}
													</div>
													{labelPage ===
													"Favourites" ? (
														<img
															className="imgFavourite"
															src={
																favouriteMovies.some(
																	(item) =>
																		item.id ===
																		movie.id
																)
																	? "/images/heart-red.png"
																	: "/images/heart.png"
															}
															// style={{ width: "10%" }}
															onClick={(
																event
															) => {
																event.stopPropagation();
																addRemoveToFavouriteMovies(
																	movie
																);
															}}
														/>
													) : null}
												</div>
											</div>
									  ))
									: null}
								;
							</div>
							<div className="boxNextPrevious">
								<button
									className="previous"
									onClick={() => {
										if (page > 1) {
											setPage(page - 1);
										}
									}}
								>
									Previous
								</button>
								<label className="lblNumberPage">
									Page {page}
								</label>
								<button
									className="next"
									onClick={() => {
										setPage(page + 1);
									}}
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
