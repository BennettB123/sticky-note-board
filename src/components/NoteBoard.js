import "./NoteBoard.css";

function NoteBoard(props) {
	const notesToRender = props.notes.map((note) => {
		return note;
	});

	return <div className="NoteBoard">{notesToRender}</div>;
}

export default NoteBoard;
