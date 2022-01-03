import React, { useState } from "react";
import "./Menu.css";
import HamburgerIcon from "./assets/HamburgerIcon";
import ExitIcon from "./assets/ExitIcon";

function Menu() {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		console.log(menuOpen);
	};

	return (
		<div className="MenuWrapper">
			<div
				className="HamburgerIconWrapper"
				title="open menu"
				onClick={toggleMenu}
			>
				<HamburgerIcon></HamburgerIcon>
			</div>
			<div
				className="Menu"
				style={{ display: menuOpen ? "block" : "none" }}
			>
				<div className="MenuHeaderBar">
					<div
						className="MenuExitButtonWrapper"
						onClick={toggleMenu}
						title="close menu"
					>
						<ExitIcon className="ExitButton" />
					</div>
				</div>

				<ul>This</ul>
				<ul>That</ul>
				<ul>Everything In Between</ul>
			</div>
		</div>
	);
}

export default Menu;
