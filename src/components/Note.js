import React, { useState, useEffect } from "react";
import "./Note.css";
import Draggable from "react-draggable";
import TripleDotIcon from "./assets/TripleDotIcon";
import ExitIcon from "./assets/ExitIcon";

function Note(props) {
	const [content, setContent] = useState(props.content);

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

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

	// Call noteUpdatedHandler when content is updated
	useEffect(() => {
		if (props.content !== content) {
			props.noteUpdatedHandler(props.id, { content: content });
		}
	}, [content, props]);

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
						{/* Potential Customization Options for Each Note:
						 * font family
						 * font size
						 * color
						 */}
					</div>

					<div
						className="ExitButtonWrapper"
						onClick={() => props.exitButtonHandler(props.id)}
						title="delete note"
					>
						<ExitIcon className="ExitButton" />
					</div>
				</div>
				<textarea
					className="NoteTextField"
					placeholder="Type your note here"
					value={content}
					onChange={handleContentChange}
				/>
			</div>
		</Draggable>
	);
}

export default Note;
