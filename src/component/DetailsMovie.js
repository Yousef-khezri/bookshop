import "./DetailsMovie.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import ReactYouTube from "react-youtube";
// import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function DetailsMovie({
	movie,
	setMovie,
	user,
	favouriteMovies,
	addRemoveToFavouriteMovies,
}) {
	// const [showBoxWatch, setShowBoxWatch] = useState(false);
	const [cards, setCards] = useState([]);
	const [hamsterCardList, setHamsterCardList] = useState([]);
	const [bestCard, setBestCard] = useState({});
	const [selectedCategory, setSelectedCategory] = useState("PR&Team");
	const categories = ["PR&Team", "Markets", "Legal", "Specials"];
	const [filteredCards, setFilteredCards] = useState([]);
	// const navigate = useNavigate();
	// const trailerRef = useRef(null);

	const userId = user.userID;

	// console.log(user);
	//######################################################################
	//--------------------- hamsterCards -----------------------------------

	useEffect(() => {
		// درخواست به سرور برای دریافت hamsterCards بر اساس userID کاربر
		const fetchHamsterCards = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/hamsterCards/${user.userID}`
				);
				if (!response.ok) {
					throw new Error("خطا در دریافت اطلاعات کارت‌ها");
				}
				const data = await response.json();
				setHamsterCardList(data);
			} catch (error) {
				console.error("Error fetching hamsterCards:", error);
			}
		};

		fetchHamsterCards();
	}, [user.userID]);

	useEffect(() => {
		console.log(hamsterCardList);
	}, [hamsterCardList]);

	//############### check db for new data (new card) ###################################
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const countResponse = await axios.get(
					"http://localhost:3000/api/airdropSubTitle/count"
				);
				const airdropSubTitleCount = countResponse.data.count;

				if (airdropSubTitleCount > hamsterCardList.length) {
					const response = await axios.get(
						"http://localhost:3000/api/airdropSubTitle"
					);
					const newAirdropCards = response.data;

					// استفاده از Set برای نگه‌داری شناسه‌های کارت‌های موجود در hamsterCardList
					const existingCardIds = new Set(
						hamsterCardList.map((card) => card.airdropSTId)
					);
					const updatedHamsterCardList = [];

					newAirdropCards.forEach((objB) => {
						if (!existingCardIds.has(objB.airdropSTId)) {
							updatedHamsterCardList.push(objB);
							existingCardIds.add(objB.airdropSTId); // اضافه کردن شناسه کارت جدید به Set
						}
					});

					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
					console.log("#### newAirdropCards #####");
					console.log(newAirdropCards);
					console.log("#### updatedHamsterCardList #####");
					console.log(updatedHamsterCardList);
					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

					if (updatedHamsterCardList.length > 0) {
						await axios.post(
							"http://localhost:3000/api/updateHamsterCards",
							{
								userID: userId,
								hamsterCards: updatedHamsterCardList,
							}
						);

						setHamsterCardList((prevList) => [
							...prevList,
							...updatedHamsterCardList,
						]);
						setErrorMessage("");
					}
				}
			} catch (error) {
				console.error(error);
				setErrorMessage("Error updating hamster cards");
			}
		};

		if (movie.airdropName === "Hamster Kombat") {
			fetchData();
		}
	}, [hamsterCardList, movie.airdropName, userId]);

	useEffect(() => {
		filterCardsByCategory();
	}, [hamsterCardList]);

	useEffect(() => {
		filterCardsByCategory();
	}, [selectedCategory]);
	//@@@@@@@@@@@@@ تست تغییرات  @@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// const [errorMessage, setErrorMessage] = useState("");

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			// دریافت تعداد سطرهای جدول airdropSubTitle
	// 			const countResponse = await axios.get(
	// 				"http://localhost:3000/api/airdropSubTitle/count"
	// 			);
	// 			const airdropSubTitleCount = countResponse.data.count;

	// 			// useEffect(() => {
	// 				console.log("#####################");
	// 				console.log("airdropSubTitleCount : ");
	// 				console.log(airdropSubTitleCount);
	// 				console.log("hamsterCardList.length : ");
	// 				console.log(hamsterCardList.length);
	// 				console.log("#####################");
	// 			// }, [filteredCards]);

	// 			if (airdropSubTitleCount > hamsterCardList.length) {
	// 				// دریافت داده‌های جدید از جدول airdropSubTitle
	// 				const response = await axios.get(
	// 					"http://localhost:3000/api/airdropSubTitle"
	// 				);
	// 				const newAirdropCards = response.data;

	// 				// به‌روزرسانی جدول hamsterCards
	// 				const updatedHamsterCardList = [
	// 					...hamsterCardList,
	// 					...newAirdropCards,
	// 				];

	// 				await axios.post(
	// 					"http://localhost:3000/api/updateHamsterCards",
	// 					{
	// 						userID: userId,
	// 						hamsterCards: updatedHamsterCardList,
	// 					}
	// 				);

	// 				setHamsterCardList(updatedHamsterCardList);
	// 				setErrorMessage("");
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 			setErrorMessage("Error updating hamster cards");
	// 		}
	// 	};

	// 	fetchData();
	// }, [hamsterCardList, userId, setHamsterCardList]);
	//####################### end check db for new data #####################################
	//---------------------------------------------------------------------------------------
	//################## Filter card with category ##########################################

	useEffect(() => {
		filterCardsByCategory();
	}, [selectedCategory, hamsterCardList]);

	const filterCardsByCategory = () => {
		const tempList = hamsterCardList.filter(
			(card) => card.category === selectedCategory
		);
		setFilteredCards(tempList);
	};

	// useEffect(() => {
	// 	console.log("#####################");
	// 	console.log("filteredCards : ");
	// 	console.log(filteredCards);
	// 	console.log("hamsterCardList : ");
	// 	console.log(hamsterCardList);
	// 	console.log("#####################");
	// }, [filteredCards]);

	//######################################################################
	//------- popup card ---------------------------------------------------
	const [selectedCard, setSelectedCard] = useState(null);
	const [profit, setProfit] = useState(0);
	const [coin, setCoin] = useState(0);

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setProfit(card.profit);
		setCoin(card.coin);
	};

	const handleGoAhead = () => {
		// Extract updated profit and coin
		const updatedProfit = parseInt(profit) || 0;
		const updatedCoin = parseInt(coin) || 0;

		// Update local state
		const updatedCardList = hamsterCardList.map((card) => {
			if (card.airdropSTId === selectedCard.airdropSTId) {
				return { ...card, profit: updatedProfit, coin: updatedCoin };
			}
			return card;
		});
		setHamsterCardList(updatedCardList);

		// Send updated data to the server
		fetch("http://localhost:3000/updateHamsterCard", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: user.userID,
				updatedCardList: JSON.stringify(updatedCardList), // Send updated card list as JSON string
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to update hamster cards");
				}
			})
			.then((data) => {
				console.log("Hamster cards updated successfully");
			})
			.catch((error) =>
				console.error("Error updating hamster cards:", error)
			);

		// Close the popup
		setSelectedCard(null);
	};

	const handleClosePopup = () => {
		setSelectedCard(null);
	};

	//------- end popup card ---------------------------------------------------------
	// After change profit and coin update hamsterCardList
	useEffect(() => {
		filterCardsByCategory();
		// useEffect(() => {
		console.log("#####################");
		console.log("filteredCards : ");
		console.log(filteredCards);
		console.log("hamsterCardList : ");
		console.log(hamsterCardList);
		console.log("#####################");
		// }, [filteredCards]);
	}, [hamsterCardList]);

	useEffect(() => {
		const fetchAirdropSubTitle = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/airdropSubTitle"
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setCards(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchAirdropSubTitle();
	}, []);

	// useEffect(() => {
	// 	if (showBoxWatch) {
	// 		trailerRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	}
	// }, [showBoxWatch]);

	//*********** find best card for bye ******************************************* */
	useEffect(() => {
		// Calculate the best card based on coin/profit
		if (hamsterCardList.length > 0) {
			let minRatio = Infinity;
			let bestCardIndex = -1;

			hamsterCardList.forEach((card, index) => {
				if (card.profit !== 0) {
					const ratio = card.coin / card.profit;
					if (ratio < minRatio) {
						minRatio = ratio;
						bestCardIndex = index;
					}
				}
			});

			if (bestCardIndex !== -1) {
				setBestCard(hamsterCardList[bestCardIndex]);
			}
		}
	}, [hamsterCardList]);

	useEffect(() => {
		if (bestCard) {
			console.log("Best Card: ", bestCard);
		}
	}, [bestCard]);

	//****************************************************************************** */

	if (!movie) {
		return <div>Loading...</div>; // Render a loading state or spinner
	}

	return (
		<div className="pageDetailsMovie">
			<Navbar user={user} />
			<div className="boxOne">
				<div className="boxDetailsMovie">
					{/*------------------ Details Part 1 -------------------- */}
					<div className="detailPart1">
						{movie ? (
							<img
								className="imgMovie"
								src={`${movie.airdropImg}`}
								alt={movie.airdropName}
							/>
						) : null}
					</div>
					{/*--------------- End Details Part 1 ------------------- */}
					{/*------------------ Details Part 2 -------------------- */}
					<div className="detailPart2">
						<label className="lblTitle">{movie.airdropName}</label>
						<br />
						<h3>{movie.airdropInf}</h3>
						<br />
						<div className="divBoxCalender">
							<img
								className="images"
								src={"/images/calendar.png"}
								alt="calendar"
							/>
							<p style={{ marginLeft: "15px" }}>
								{movie.airdropSD}
							</p>
						</div>
						<div className="divBoxCalender">
							<img
								className="images"
								src={"/images/web.png"}
								alt="web"
							/>
							<a
								href={movie.airdropWS}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									textDecoration: "none",
								}}
							>
								<p
									style={{
										marginLeft: "15px",
										textDecoration: "none",
									}}
								>
									Website Airdrop
								</p>
							</a>
						</div>
						<div className="divBoxCalender">
							<img
								className="images"
								src={"/images/mobile.png"}
								alt="mobile game"
							/>
							<a
								href={movie.linkRefral}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									textDecoration: "none",
								}}
							>
								<p
									style={{
										marginLeft: "15px",
										textDecoration: "none",
									}}
								>
									Start Airdrop
								</p>
							</a>
							<img
								className="imgFavourite"
								src={
									favouriteMovies.some(
										(item) => item.id === movie.id
									)
										? "/images/heart-red.png"
										: "/images/heart.png"
								}
								style={{ width: "9%", marginLeft: "80px" }}
								onClick={() =>
									addRemoveToFavouriteMovies(movie)
								}
							/>
						</div>
					</div>
					{/*--------------- End Details Part 2 ------------------- */}
					{/*------------------ Details Part 3 -------------------- */}
					{movie.airdropName === "Hamster Kombat" ? (
						<div className="detailPart3">
							<h2>Best card for buy</h2>
							{bestCard ? (
								<div
									className="cardItem"
									onClick={() => handleCardClick(bestCard)}
								>
									<img
										style={{
											width: "165px",
											height: "175px",
										}}
										src={
											bestCard
												? `/cards/${bestCard.cardImg}`
												: "/images/question-mark.png"
										}
										alt={
											bestCard
												? bestCard.cardName
												: "Question Mark"
										}
									/>
									<div className="detailsMovieItem">
										<div className="titleMoviItem">
											<h4>{bestCard.cardName}</h4>
											<div
												style={{
													width: "100%",
													display: "flex",
													flexDirection: "row",
													justifyContent:
														"space-around",
												}}
											>
												<label>Profit</label>
												<label>{bestCard.profit}</label>
											</div>
											<div
												style={{
													width: "100%",
													display: "flex",
													flexDirection: "row",
													justifyContent:
														"space-around",
												}}
											>
												<label>Coin</label>
												<label>{bestCard.coin}</label>
											</div>
											<label>{bestCard.category}</label>
										</div>
									</div>
								</div>
							) : (
								<p>No cards available in this category.</p>
							)}
						</div>
					) : null}
					{/*--------------- End Details Part 3 ------------------- */}
				</div>

				{/* ------------------------ Details Part 4  --------------------------- */}
				<>
					{/* {showBoxWatch ? (
					<div className="boxWatchTrailer" ref={trailerRef}>
						<div className="boxVideo">
							<ReactYouTube
								videoId={movie.yt_trailer_code}
								opts={{
									width: "100%",
									height: "100%",
									playerVars: {
										autoplay: 1, // Start playing automatically
										controls: 1, // Show player controls
										loop: 1, // Loop the video
									},
								}}
								onEnd={(e) => e.target.playVideo()} // Restart the video when it ends
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</div>
				) : null} */}
				</>
			</div>
			{/* ------------------------ End  Box 1  ------------------------------- */}
			{/* ------------------------#################--------------------------- */}
			{/* ------------------------ Start Box 2  ------------------------------ */}
			<>
				{/* <div className="boxTwo">
				<div className="moviesList">
					{cards
						? cards.map((card, index) => (
								<div key={index} className="movieItem">
									<img
										style={{
											width: "165px",
											height: "175px",
										}}
										src={`/cards/${card.cardImg}`}
										alt={card.cardName}
									/>
									<div className="detailsMovieItem">
										<div className="titleMoviItem">
											<h4>{card.cardName}</h4>
											<br />
											<h4>{card.category}</h4>
										</div>
									</div>
								</div>
						  ))
						: null}
					;
				</div>
			</div> */}
			</>
			<div>
				{movie.airdropName === "Hamster Kombat" ? (
					<div className="categories">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={
									selectedCategory === category
										? "active"
										: ""
								}
							>
								{category}
							</button>
						))}
					</div>
				) : null}
				{movie.airdropName === "Hamster Kombat" ? (
					<div className="boxTwo">
						<div className="moviesList">
							{filteredCards.length ? (
								filteredCards.map((card, index) => (
									<div
										key={index}
										className="cardItem"
										onClick={() => handleCardClick(card)}
									>
										<img
											style={{
												width: "165px",
												height: "175px",
											}}
											src={`/cards/${card.cardImg}`}
											alt={card.cardName}
										/>
										<div className="detailsMovieItem">
											<div className="titleMoviItem">
												<h4>{card.cardName}</h4>
												<div
													style={{
														width: "100%",
														display: "flex",
														flexDirection: "row",
														justifyContent:
															"space-around",
													}}
												>
													<label>Profit</label>
													<label>{card.profit}</label>
												</div>
												<div
													style={{
														width: "100%",
														display: "flex",
														flexDirection: "row",
														justifyContent:
															"space-around",
													}}
												>
													<label>Coin</label>
													<label>{card.coin}</label>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<p>No cards available in this category.</p>
							)}
						</div>
					</div>
				) : null}
				{/* -------- Popup card ------------------------------------------------ */}
				{selectedCard && (
					<div className="popup">
						<div className="popup-inner">
							<button
								className="close-btn"
								onClick={handleClosePopup}
							>
								X
							</button>
							<h3>{selectedCard.cardName}</h3>
							<img
								style={{
									width: "165px",
									height: "175px",
									borderRadius: "15px",
								}}
								src={`/cards/${selectedCard.cardImg}`}
								alt={selectedCard.cardName}
							/>
							<h4>Profit</h4>
							<input
								type="number"
								value={profit}
								onChange={(e) => setProfit(e.target.value)}
							/>
							<h4>Coin</h4>
							<input
								type="number"
								value={coin}
								onChange={(e) => setCoin(e.target.value)}
							/>
							<br />
							<button
								className="btn-goAhead"
								onClick={handleGoAhead}
							>
								Go ahead
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default DetailsMovie;
