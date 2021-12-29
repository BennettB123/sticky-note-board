import React from "react";
import "./Note.css";
import Draggable from "react-draggable";
import TripleDotIcon from "./assets/TripleDotIcon";
import ExitIcon from "./assets/ExitIcon";

function Note(props) {
  // required for React not to throw errors about findDOMNode being deprecated
  const nodeRef = React.useRef(null);

  // used to only drag if mouse is on the NoteHeader
  const dragHandler = () => {
    var noteHeader = [].slice.call(
      document.getElementsByClassName("NoteHeader")
    );
    if (
      !noteHeader.some((header) => {
        return header.matches(":hover");
      })
    )
      return false;
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: 0, y: 0 }}
      nodeRef={nodeRef}
      onStart={dragHandler}
    >
      <div className="Note" ref={nodeRef}>
        <div className="NoteHeader">
          <div className="MenuButtonWrapper" title="open note menu">
            <TripleDotIcon></TripleDotIcon>
          </div>

          <div
            className="ExitButtonWrapper"
            onClick={() => props.exitButtonHandler(props.id)}
            title="delete note"
          >
            <ExitIcon className="ExitButton" />
          </div>
        </div>
        <h1>This is a note!</h1>
        <h3>Soon you will be able to type here</h3>
      </div>
    </Draggable>
  );
}

export default Note;
