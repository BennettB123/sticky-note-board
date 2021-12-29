import React, { useState } from "react";
import "./NoteBoard.css";
import MenuButton from "./MenuButton.js";
import AddNoteButton from "./AddNoteButton";
import Note from "./Note";

function NoteBoard() {
  const [notes, setNotes] = useState([]);
  const [nextNoteId, setNextNoteId] = useState(0);

  const addNoteButtonHandler = () => {
    let newNotesList = notes.concat({
      id: nextNoteId,
    });
    setNotes(newNotesList);
    setNextNoteId(nextNoteId + 1);
  };

  const exitButtonHandler = (id) => {
    var remainingNotes = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(remainingNotes);
  };

  return (
    <div className="NoteBoardWrapper">
      <div className="HeaderBar">
        <div className="filler"></div>
        <h1 className="TitleText">Sticky Note Board</h1>
        <AddNoteButton onClick={addNoteButtonHandler} />
        <MenuButton />
      </div>
      <div className="NoteBoard">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            exitButtonHandler={exitButtonHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteBoard;
