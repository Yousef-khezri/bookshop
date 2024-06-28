import "./MenuHome.css";
import React, { useState } from "react";

function MenuHome({ setLabelPage, setPage }) {
	const [selectedButton, setSelectedButton] = useState("New Releases");

	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
		setLabelPage(buttonName);
		setPage(1);
	};

	return (
		<div className="menu">
			<div className="box_btn">
				{[
					"Airdrops",
					"Trending",
					"New Airdrops",
					"Coming Soon",
					"Favourites",
				].map((buttonName) => (
					<button
						key={buttonName}
						className={
							selectedButton === buttonName ? "selected" : ""
						}
						onClick={() => handleButtonClick(buttonName)}
					>
						{buttonName}
						{selectedButton === buttonName && (
							<img
								src="/images/right-arrow.png"
								alt="arrow"
								className="right-arrow"
							/>
						)}
					</button>
				))}
			</div>
			<div className="divLine"></div>
			<div className="box_LastActivity">
				<h4>LAST ACTIVITY</h4>
				<br />
				<h1>Test</h1>
			</div>
		</div>
	);
}

export default MenuHome;
