import React from "react";

// PUBLIC_INTERFACE
function HeaderBar({ onAddNote, search, setSearch }) {
  /**
   * HeaderBar: Displays the top navigation bar including brand, search and add button.
   * Props:
   *   onAddNote - function to handle creation of a new note
   *   search - current search term
   *   setSearch - function to set search term
   */
  return (
    <header className="header-bar">
      <div className="logo">Notes</div>
      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <button className="add-btn" onClick={onAddNote} aria-label="Add note">
        +
      </button>
    </header>
  );
}

export default HeaderBar;
