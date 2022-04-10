import React, { useState, useEffect } from "react";
import "./Note.css";
import Draggable from "react-draggable";
import TripleDotIcon from "./assets/TripleDotIcon";
import ExitIcon from "./assets/ExitIcon";

function Note(props) {
	const [content, setContent] = useState(props.content);
	const [x, setX] = useState(props.x);
	const [y, setY] = useState(props.y);
	const [z, setZ] = useState(props.z);
	const [width, setWidth] = useState(props.width);
	const [height, setHeight] = useState(props.height);
	const [color, setColor] = useState(props.color);
	const [headerColor, setHeaderColor] = useState(props.headerColor);
	const [menuOpen, setMenuOpen] = useState(false);

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
		else {
			var newZ = props.noteUpdateZIndexHandler(props.id);
			setZ(newZ);
		}
	};

	const dragStopHandler = (_mouseEvent, locationData) => {
		setX(locationData.x);
		setY(locationData.y);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

	const handleColorChange = (color, headerColor) => {
		setColor(color);
		setHeaderColor(headerColor);
		setMenuOpen(!menuOpen);
	};

	// Detect note size changes
	useEffect(() => {
		const myObserver = new ResizeObserver((entries) => {
			let newWidth = entries[0].contentRect.width;
			let newHeight = entries[0].contentRect.height;
			if (newWidth !== props.width || newHeight !== props.height) {
				setWidth(newWidth);
				setHeight(newHeight);
			}
		});

		const noteElement = document.querySelector(`#Note${props.id}`);
		myObserver.observe(noteElement);

		// cleanup to avoid memory leaks when notes are deleted
		return function cleanup() {
			myObserver.disconnect();
		};
	}, [props]);

	// Call noteUpdatedHandler when note is updated/moved/resized
	useEffect(() => {
		if (
			props.content !== content ||
			x !== props.x ||
			y !== props.y ||
			z !== props.z ||
			width !== props.width ||
			height !== props.height ||
			color !== props.color ||
			headerColor !== props.headerColor
		) {
			props.noteUpdatedHandler(props.id, {
				content: content,
				x: x,
				y: y,
				z: z,
				width: width,
				height: height,
				color: color,
				headerColor: headerColor,
			});
		}
	}, [content, x, y, z, width, height, color, headerColor, props]);

	return (
		<Draggable
			bounds="parent"
			defaultPosition={{ x: props.x, y: props.y }}
			nodeRef={nodeRef}
			onStart={dragStartHandler}
			onStop={dragStopHandler}
		>
			<div
				className="Note"
				id={`Note${props.id}`}
				ref={nodeRef}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					zIndex: z, //////////////////////// THIS SHIT AINT WORKING ///////////////////////
					backgroundColor: color,
				}}
			>
				<div
					className="NoteHeader"
					style={{
						backgroundColor: headerColor,
					}}
				>
					<div
						className="MenuButtonWrapper"
						onClick={() => setMenuOpen(!menuOpen)}
						title="open note menu"
					>
						<TripleDotIcon></TripleDotIcon>
					</div>

					<div
						className="ExitButtonWrapper"
						onClick={() => props.exitButtonHandler(props.id)}
						title="delete note"
					>
						<ExitIcon className="ExitButton" />
					</div>
					<div
						className="NoteMenu"
						style={{
							display: menuOpen ? "flex" : "none",
						}}
					>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#FFED73" }}
							onClick={() =>
								handleColorChange("#FFF8aa", "#FFED73")
							}
						></div>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#A0FFA0" }}
							onClick={() =>
								handleColorChange("#C7F6B6", "#A0FFA0")
							}
						></div>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#FECBD4" }}
							onClick={() =>
								handleColorChange("#FDD7DE", "#FECBD4")
							}
						></div>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#9BD7FB" }}
							onClick={() =>
								handleColorChange("#C1E9FC", "#9BD7FB")
							}
						></div>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#FFB347" }}
							onClick={() =>
								handleColorChange("#FFC983", "#FFB347")
							}
						></div>
						<div
							className="NoteColorSelectionBlock"
							style={{ backgroundColor: "#B19CD9" }}
							onClick={() =>
								handleColorChange("#D6B8E6", "#B19CD9")
							}
						></div>
						<div className="NoteMenuExitButtonWrapperWrapper">
							<div
								className="NoteMenuExitButtonWrapper"
								onClick={() => {
									setMenuOpen(!menuOpen);
								}}
								title="close menu"
							>
								<ExitIcon className="NoteMenuExitButton" />
							</div>
						</div>
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
