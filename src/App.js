import React, { useState } from "react";
import "./App.css";
import NoteBoard from "./components/NoteBoard.js";
import MenuButton from "./components/MenuButton.js";
import AddNoteButton from "./components/AddNoteButton";
import Note from "./components/Note";

function App() {
	const [notes, setNotes] = useState([]);

	const addNoteButtonHandler = () => {
		let newNotesList = notes.concat(
			<Note
				key={notes.length}
				noteIndex={notes.length}
				allNotes={notes}
			/>
		);
		setNotes(newNotesList);
	};

	return (
		<div className="App">
			<div className="HeaderBar">
				<div className="filler"></div>
				<h1 className="TitleText">Sticky Note Board</h1>
				<AddNoteButton onClick={addNoteButtonHandler} />
				<MenuButton />
			</div>
			<NoteBoard notes={notes} />
		</div>
	);
}

export default App;
