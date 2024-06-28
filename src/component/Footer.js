import React from "react";
import "./Footer.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
	return (
		<footer className="footer">
			<p>&copy; 2024 All rights reserved.</p>
			<div className="footer-links">
				<a
					href="https://www.instagram.com/joseph.khezri?utm_source=qr&igsh=bW1kbTh1bjQ2eGhz"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaInstagram className="icon" /> Instagram
				</a>
				<a href="Joseph.khezri@icloud.com">
					<FaEnvelope className="icon" /> Email
				</a>
			</div>
		</footer>
	);
}

export default Footer;
