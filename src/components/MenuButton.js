import "./MenuButton.css";
import HamburgerIcon from "./assets/HamburgerIcon";

function MenuButton() {
	return (
		<div className="MenuIcon">
			<div className="HamburgerIconWrapper" title="open menu">
				<HamburgerIcon></HamburgerIcon>
			</div>
		</div>
	);
}

export default MenuButton;
