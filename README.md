﻿# sticky-note-board

This is a simple web application to create virtual sticky notes.

## How to Use

### Creating New Sticky Notes

To create a new sticky note, click the `+` icon in the top right of the page

### Editing Sticky Notes

Clicking on the body of a sticky note will open the note's editor. This is where you can make content changes to the notes. You can use simple text, or you can stylize your notes by using markdown! The supported markdown elements are:
* Headers (`#`, `##`, `###`, `####`)
* Bullet points (`*` or `-`)
* Code (by wrapping text in \`backticks\`)
* Bold text (wrapping text in \*asterisks\*)
* Italic text (wrapping text in \*\*double asterisks\*\*)
* Horizontal rule (`---`)

Notes can be moved around the virtual tack-board by dragging the note's header. Notes cannot be moved outside of the tackboard.

The color of each sticky note can be changed by clicking the triple-dot icon in the note's header.

To close notes, click the `x` icon in the note's header.

### Changing the Wall Color

The wall color can be changed by clicking on the hamburger icon in the top right of the page. This will open the application settings where you can select your desired wall color.

### Saving Your Sticky Notes

All of your sticky notes and even the wall color will be saved automatically every time an action is taken (i.e. changing wall color, creating notes, editing/moving notes). This is done by utilizing the browser's local storage. This means that your notes are only ever seen by you and never sent to a server. However, this also means that there is not an easy way to transfer your sticky notes to another computer or browser. Each browser will have a different set of sticky notes.

## Try it Out!

A public version of the app can be found at [dbballentine.com/sticky-notes](https://dbballentine.com/sticky-notes)
