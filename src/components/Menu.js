import React, { useState } from "react";
import "./Menu.css";
import HamburgerIcon from "./assets/HamburgerIcon";
import ExitIcon from "./assets/ExitIcon";

function Menu(props) {
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

				<ul>
					<label>Wall Background Color</label>
					<div className="ColorSelectionBlockWrapper">
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#ffffff" }}
							onClick={() => props.wallColorCallback("#ffffff")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#96d6d6" }}
							onClick={() => props.wallColorCallback("#96d6d6")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#ff6b6b" }}
							onClick={() => props.wallColorCallback("#ff6b6b")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#abff7a" }}
							onClick={() => props.wallColorCallback("#abff7a")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#f2bdff" }}
							onClick={() => props.wallColorCallback("#f2bdff")}
						></div>
					</div>
					<div className="ColorSelectionBlockWrapper">
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#fcfaa7" }}
							onClick={() => props.wallColorCallback("#fcfaa7")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#a38fff" }}
							onClick={() => props.wallColorCallback("#a38fff")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#ffc675" }}
							onClick={() => props.wallColorCallback("#ffc675")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#8fffba" }}
							onClick={() => props.wallColorCallback("#8fffba")}
						></div>
						<div
							className="ColorSelectionBlock"
							style={{ backgroundColor: "#a1a1a1" }}
							onClick={() => props.wallColorCallback("#a1a1a1")}
						></div>
					</div>
				</ul>
			</div>
		</div>
	);
}

export default Menu;
