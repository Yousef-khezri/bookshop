import "./ImageSlider.css";
import React, { useState, useEffect } from "react";

function ImageSlider({ airdrops }) {

	const clickedPrev = () => {
		let items = document.querySelectorAll(".item");
		document.querySelector(".box").prepend(items[items.length - 1]);
	};

	const clickedNext = () => {
		let items = document.querySelectorAll(".item");
		document.querySelector(".box").appendChild(items[0]);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			clickedNext();
		}, 3000);

		return () => clearInterval(interval);
	}, [airdrops]);

	return (
		<div className="body">
			<div className="box">
				{airdrops ? airdrops.map((airdrop, index) => (
					<div className="item" key={index}>
						<img
							src={`${airdrop.airdropImg}`}
							alt={`trending airdrop ${index}`}
						/>
					</div>
				)) : null}
			</div>
			<div className="buttons">
				<span className="prev" onClick={clickedPrev}></span>
				<span className="next" onClick={clickedNext}></span>
			</div>
		</div>
	);
}

export default ImageSlider;
