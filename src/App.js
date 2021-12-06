import "./App.css";
import NoteBoard from "./components/NoteBoard.js";
import HelpIcon from "./components/HelpIcon.js";

function App() {
	return (
		<div className="App">
			<div className="HeaderBar">
				<div className="filler"></div>
				<h1 className="TitleText">Sticky Note Board</h1>
				<HelpIcon />
			</div>
			<NoteBoard />
		</div>
	);
}

export default App;
