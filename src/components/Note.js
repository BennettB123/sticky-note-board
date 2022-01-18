import React, { useState, useEffect } from "react";
import "./Note.css";
import Draggable from "react-draggable";
import TripleDotIcon from "./assets/TripleDotIcon";
import ExitIcon from "./assets/ExitIcon";

function Note(props) {
	const [content, setContent] = useState(props.content);
	const [x, setX] = useState(props.x);
	const [y, setY] = useState(props.y);

	// required for React not to throw errors about findDOMNode being deprecated
	const nodeRef = React.useRef(null);

	// used to only drag if mouse is on the NoteHeader
	const dragStartHandler = () => {
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

	const dragStopHandler = (_mouseEvent, locationData) => {
		setX(locationData.x);
		setY(locationData.y);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

	// Call noteUpdatedHandler when content is updated
	useEffect(() => {
		if (props.content !== content || x !== props.x || y !== props.y) {
			props.noteUpdatedHandler(props.id, {
				content: content,
				x: x,
				y: y,
			});
		}
	}, [content, x, y, props]);

	return (
		<Draggable
			bounds="parent"
			defaultPosition={{ x: props.x, y: props.y }}
			nodeRef={nodeRef}
			onStart={dragStartHandler}
			onStop={dragStopHandler}
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
