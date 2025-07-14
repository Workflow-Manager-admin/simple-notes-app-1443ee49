import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ notes, selectedId, onSelect }) {
  /**
   * Sidebar: Displays the list of notes for navigation.
   * Props:
   *   notes - array of note objects
   *   selectedId - current selected note id
   *   onSelect - function to select note by id
   */
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">All Notes</h2>
      <nav>
        <ul className="sidebar-list">
          {notes.length === 0 && (
            <li className="sidebar-empty">No notes</li>
          )}
          {notes.map((note) => (
            <li
              key={note.id}
              className={`sidebar-item${selectedId === note.id ? " active" : ""}`}
              onClick={() => onSelect(note.id)}
              tabIndex={0}
              aria-current={selectedId === note.id ? "page" : undefined}
            >
              <div className="sidebar-note-title">{note.title || "Untitled"}</div>
              <div className="sidebar-note-date">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
