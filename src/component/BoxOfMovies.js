import "./BoxOfMovies.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function BoxOfMovies({ listOfSearchedMovies, setPage, page, setMovie }) {
	const navigate = useNavigate();

	const handleMovieItemClick = (movie) => {
		setMovie(movie);
		navigate(`/movie-details/${movie.title}`);
	};

	return (
		<div className="boxOfMovies">
			{/* <h1 className="titelBoxOfMovies">{labelPage}</h1> */}
			<div className="moviesList">
				{listOfSearchedMovies.map((movie) => (
					<div
						key={movie.id}
						className="movieItem"
						onClick={() => handleMovieItemClick(movie)}
					>
						<div className="rating">{movie.rating}</div>
						<img src={movie.large_cover_image} alt={movie.title} />
						<div className="detailsMovieItem">
							<div className="titleMoviItem">
								<h4>{movie.title}</h4>
								<h5>{movie.genres.join(", ")}</h5>
							</div>
						</div>
					</div>
				))}
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
				<label className="lblNumberPage">Page {page}</label>
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
	);
}

export default BoxOfMovies;
