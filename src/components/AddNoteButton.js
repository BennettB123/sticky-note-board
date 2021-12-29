import "./AddNoteButton.css";
import AddIcon from "./assets/AddIcon";

function AddNoteButton(props) {
	return (
		<div className="AddNoteButton">
			<div
				className="AddNoteButtonWrapper"
				title="new note"
				onClick={props.onClick}
			>
				<AddIcon></AddIcon>
			</div>
		</div>
	);
}

export default AddNoteButton;
