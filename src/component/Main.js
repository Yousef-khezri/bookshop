import "./Main.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Main({ data, setSelectedCardData, addTofavoriteRecipes, favoriteRecipes }) {
	const navigate = useNavigate();

	const handleCardClick = (index) => {
		setSelectedCardData(data[index]);
		navigate(`/page/${data[index].recipe.label}`);
		console.log("index : " + index);
		console.log(data[index]);
	};

	const clickedHeart = (item) => {
		console.log("item : " + item);
		addTofavoriteRecipes(item);
	};

	const create_Card = (item, index) => {
		return (
			<Card
				className="card"
				key={index}
				style={{ width: "18rem", cursor: "pointer" }}
			>
				<Card.Img
					variant="top"
					src={item.recipe.image}
					onClick={() => handleCardClick(index)}
				/>
				<Card.Body>
					<Card.Title onClick={() => handleCardClick(index)}>
						{item.recipe.label}
					</Card.Title>
					<Card.Text
						onClick={() => handleCardClick(index)}
						style={{
							borderTop: "2px solid black",
							borderBottom: "2px solid black",
						}}
					>
						{parseFloat(item.recipe.calories.toFixed(0))} CALORIES6
						| {item.recipe.ingredients.length} INGREDIENTS
					</Card.Text>
					{favoriteRecipes.some(
						(recipe) => recipe.recipe.label === item.recipe.label
					) ? (
						<img
							key={index}
							onClick={() => clickedHeart(item)}
							style={{ width: "50px", border: "none" }}
							src="/images/heart-red.png"
						/>
					) : (
						<img
							key={index}
							onClick={() => clickedHeart(item)}
							style={{ width: "50px", border: "none" }}
							src="/images/heart.png"
						/>
					)}
				</Card.Body>
			</Card>
		);
	};

	console.log(data);

	return (
		<div className="main">
			{data.length === 0 ? (
				"Loading..."
			) : (
				<div className="card_Box">
					{data.map((item, index) => create_Card(item, index))}
				</div>
			)}
		</div>
	);
}
