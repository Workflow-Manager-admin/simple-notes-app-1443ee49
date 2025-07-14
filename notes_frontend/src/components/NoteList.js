import React from "react";

// PUBLIC_INTERFACE
function NoteList({ notes, onSelect, selectedId }) {
  /**
   * NoteList: Lists all filtered notes in the main area.
   * Props:
   *   notes - array of note objects
   *   onSelect - function to select note by id
   *   selectedId - current selected note id
   */
  if (!notes.length) {
    return <div className="note-list-empty">No notes match your search.</div>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`note-list-item${selectedId === note.id ? " selected" : ""}`}
          onClick={() => onSelect(note.id)}
          tabIndex={0}
        >
          <h3 className="note-title">{note.title || "Untitled"}</h3>
          <div className="note-snippet">
            {note.content ? note.content.slice(0, 80) : ""}
          </div>
          <div className="note-meta">{new Date(note.updatedAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
