import "./Navbar.css";
import React from "react";
import Search from "./Search";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, setMovie, movie }) {
	const navigate = useNavigate();

	return (
		<div className="header">
			<nav className="navbar">
				<Link
					style={{
						margin: "10px 10px",
						fontSize: "30px",
						fontWeight: "900",
						color: "white",
					}}
					to="/"
				>
					Joseph Media
				</Link>
				<Search setMovie={setMovie} movie={movie} />
				<Link
					to={`/details-user/${user.userName}`}
					style={{ marginRight: "10px" }}
				>
					<div className="PartProfile">
						<h6 style={{ color: "white", fontSize: "23px" }}>
							{user.userName}
						</h6>
						<img
							src={
								user.profileImage
								? user.profileImage
								: "/images/noneGender.png"
							}
							alt="menu icon"
							width="65px"
							style={{
								borderRadius: "50%",
							}}
						/>
					</div>
				</Link>
			</nav>
			<Outlet />
		</div>
	);
}
