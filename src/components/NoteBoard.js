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
	const nextNoteX = 0;
	const nextNoteY = 0;
	const defaultNoteWidth = 250;
	const defaultNoteHeight = 250;
	const defaultNoteColor = "#FFF8aa";
	const defaultNoteHeaderColor = "#FFED73";

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

	// Update the notes in localStorage when a note is changed
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
				note.x = noteProperties.x;
				note.y = noteProperties.y;
				note.layeringIndex = noteProperties.layeringIndex;
				note.width = noteProperties.width;
				note.height = noteProperties.height;
				note.color = noteProperties.color;
				note.headerColor = noteProperties.headerColor;
			}
		});
		setNotes(newNotes);
		setNoteChanged(true);
	};

	const addNoteButtonHandler = () => {
		let newLayeringIndex = getHighestLayerIndexPlusOne();

		let newNotesList = notes.concat({
			id: nextNoteId,
			content: defaultNoteContent,
			x: nextNoteX,
			y: nextNoteY,
			layeringIndex: newLayeringIndex,
			width: defaultNoteWidth,
			height: defaultNoteHeight,
			color: defaultNoteColor,
			headerColor: defaultNoteHeaderColor,
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

	const noteUpdatedLayeringIndexHandler = (id) => {
		let newLayeringIndex = getHighestLayerIndexPlusOne();
		let newNotes = notes;
		newNotes.forEach((note) => {
			if (note.id === id) {
				note.layeringIndex = newLayeringIndex;
			}
		});
		setNotes(newNotes);
		setNoteChanged(true);
		return newLayeringIndex;
	};

	const wallColorCallback = (colorHexString) => {
		localStorage.setItem("wallColor", colorHexString);
		document.body.style.backgroundColor = colorHexString;
	};

	const getHighestLayerIndexPlusOne = () => {
		let currMaxLayer = 0;
		notes.forEach((note) => {
			if (note.layeringIndex > currMaxLayer)
				currMaxLayer = note.layeringIndex;
		});
		// terrible way to calculate layering indexes because their values always go up.
		// I know its basically impossible for this to ever reach the max number, but just in case...
		if (Number.isSafeInteger(currMaxLayer + 1)) return currMaxLayer + 1;
		else return 0;
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
				{notes
					.sort(
						(note1, note2) =>
							note1.layeringIndex - note2.layeringIndex
					)
					.map((note) => (
						<Note
							key={note.id}
							id={note.id}
							content={note.content}
							x={note.x}
							y={note.y}
							layeringIndex={note.layeringIndex}
							width={note.width}
							height={note.height}
							color={note.color}
							headerColor={note.headerColor}
							exitButtonHandler={exitButtonHandler}
							noteUpdatedHandler={noteUpdatedHandler}
							noteUpdatedLayeringIndexHandler={
								noteUpdatedLayeringIndexHandler
							}
						/>
					))}
			</div>
		</div>
	);
}

export default NoteBoard;
