import React, { useState, useEffect } from "react";
import "./NoteBoard.css";
import Menu from "./Menu.js";
import AddNoteButton from "./AddNoteButton";
import Note from "./Note";

function NoteBoard() {
	const [notes, setNotes] = useState([]);
	const [noteChanged, setNoteChanged] = useState(false);
	const [nextNoteId, setNextNoteId] = useState(0);
	const defaultNoteContent = "";

	useEffect(() => {
		// Get previous wall color from localStorage if exists
		let previousWallColor = localStorage.getItem("wallColor");
		if (previousWallColor) {
			document.body.style.backgroundColor = previousWallColor;
		}

		// Get previous notes from localStorage if exists
		let previousNotes = localStorage.getItem("notes");
		if (previousNotes) {
			retrieveNotesFromLocalStorage(previousNotes);
		}
	}, []);

	// Update the notes in localStorage when a new is changed
	useEffect(() => {
		if (noteChanged) {
			localStorage.setItem("notes", JSON.stringify(notes));
			setNoteChanged(false);
		}
	}, [noteChanged, notes]);

	const retrieveNotesFromLocalStorage = () => {
		let json = localStorage.getItem("notes");
		let retrievedNotes = JSON.parse(json);

		// set new nextNoteId to avoid id collisions with previous notes.
		if (retrievedNotes.length > 0) {
			let newNoteId =
				Math.max(...retrievedNotes.map((note) => note.id)) + 1;
			setNextNoteId(newNoteId + 1);
		}

		setNotes(retrievedNotes);
	};

	const noteUpdatedHandler = (id, noteProperties) => {
		let newNotes = notes;
		newNotes.forEach((note) => {
			if (note.id === id) {
				note.content = noteProperties.content;
			}
		});
		setNotes(newNotes);
		setNoteChanged(true);
	};

	const addNoteButtonHandler = () => {
		let newNotesList = notes.concat({
			id: nextNoteId,
			content: defaultNoteContent,
		});
		setNotes(newNotesList);
		setNextNoteId(nextNoteId + 1);
	};

	const exitButtonHandler = (id) => {
		var remainingNotes = notes.filter((note) => {
			return note.id !== id;
		});
		setNotes(remainingNotes);
		setNoteChanged(true);
	};

	const wallColorCallback = (colorHexString) => {
		localStorage.setItem("wallColor", colorHexString);
		document.body.style.backgroundColor = colorHexString;
	};

	return (
		<div className="NoteBoardWrapper">
			<div className="HeaderBar">
				<div className="filler"></div>
				<h1 className="TitleText">Sticky Note Board</h1>
				<AddNoteButton onClick={addNoteButtonHandler} />
				<Menu wallColorCallback={wallColorCallback} />
			</div>
			<div className="NoteBoard">
				{notes.map((note) => (
					<Note
						key={note.id}
						id={note.id}
						content={note.content}
						exitButtonHandler={exitButtonHandler}
						noteUpdatedHandler={noteUpdatedHandler}
					/>
				))}
			</div>
		</div>
	);
}

export default NoteBoard;
