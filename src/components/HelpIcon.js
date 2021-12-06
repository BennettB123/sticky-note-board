import "./HelpIcon.css";

const HamburgerIcon = () => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			version="1.2"
			baseProfile="tiny"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M19 17h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zM19 10h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zM19 3h-14c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2z" />
		</svg>
	);
};

function HelpIcon() {
	return (
		<div className="HelpIcon">
			<div className="HamburgerIconWrapper" title="open menu">
				<HamburgerIcon alt="open menu"></HamburgerIcon>
			</div>
		</div>
	);
}

export default HelpIcon;
