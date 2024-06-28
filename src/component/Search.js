import "./Search.css";
import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search({ setMovie, movie }) {
	const [inputSearch, setInputSearch] = useState("");
	// const [isDataFetched, setIsDataFetched] = useState(false);
	// const [dataMovie, setDataMovie] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	const handleInputChange = (event) => {
		// setInputSearch(event.target.value);
		// console.log(inputSearch);
	};

	const btnSearchClicked = () => {
	// 	if (inputSearch !== "") {
	// 		const url = `https://yts.mx/api/v2/list_movies.json?query_term=${inputSearch}`;
	// 		try {
	// 			fetch(url)
	// 				.then((response) => response.json())
	// 				.then((data) => {
	// 					if (
	// 						data.status === "ok" &&
	// 						data.data.movies.length > 0
	// 					) {
	// 						setDataMovie(data.data.movies[0]);
	// 						setIsDataFetched(true);
	// 					} else {
	// 						console.error(
	// 							"Error fetching movie details:",
	// 							data
	// 						);
	// 						setIsDataFetched(false);
	// 					}
	// 				})
	// 				.catch((error) => {
	// 					console.error("Fetch error:", error);
	// 					setIsDataFetched(false);
	// 				});
	// 		} catch (error) {
	// 			console.error("Fetch error:", error);
	// 			alert("An error occurred while fetching the movies.");
	// 		}
	// 	} else {
	// 		alert("Please enter a movie name");
	// 	}
	};

	// useEffect(() => {
	// 	// console.log(dataMovie);
	// 	if (dataMovie) {
	// 		let url = `https://yts.mx/api/v2/movie_details.json?movie_id=${dataMovie.id}&with_images=true&with_cast=true`;

	// 		fetch(url)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				if (data.status === "ok" && data.data.movies.length > 0) {
	// 					setMovie(data.data.movie[0]);
	// 				} else {
	// 					console.error("Error fetching movie details:", data);
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.error("Fetch error:", error);
	// 			});
	// 	}
	// }, [dataMovie]);

	// useEffect(() => {
	// 	if (isDataFetched && movie) {
	// 		navigate(`/movie-details/${movie.title}`);
	// 	}
	// }, [isDataFetched, movie, navigate]);

	return (
		<div className="search_Page">
			<InputGroup
				className="mb-3"
				style={{
					width: "100%",
					height: "50px",
				}}
			>
				{location.pathname !== "/advanced-search-page" && (
					<Button
						variant="success"
						className="btnAdvancedSearch"
						style={{ marginRight: "10px" }}
						onClick={() => {
							navigate("/advanced-search-page");
						}}
					>
						Advanced search
					</Button>
				)}
				<Button
					className="btnSearch"
					variant="primary"
					onClick={btnSearchClicked}
				>
					<Image src="/images/search.png" roundedCircle width={25} />
				</Button>
				<Form.Control
					type="text"
					className="input-Search"
					placeholder="Search Airdrop..."
					aria-label="Movie search"
					aria-describedby="basic-addon2"
					value={inputSearch}
					onChange={handleInputChange}
				/>
			</InputGroup>
		</div>
	);
}
