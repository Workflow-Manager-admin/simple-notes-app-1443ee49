import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function NoteDetail({ note, onCancel, onSave, onDelete }) {
  /**
   * NoteDetail: Shows and allows editing of note details, and deletion.
   * Props:
   *   note - note object (may be undefined)
   *   onCancel - function to cancel editing/close panel
   *   onSave - function to save (update/create) note (noteObj) => void
   *   onDelete - function to delete note (noteId) => void
   */
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: note ? note.title : "",
    content: note ? note.content : "",
  });

  useEffect(() => {
    setForm({ title: note ? note.title : "", content: note ? note.content : "" });
    setEditing(false);
  }, [note]);

  if (!note) {
    return (
      <div className="note-detail">
        <div className="note-detail-empty">
          Select a note or create a new one.
        </div>
      </div>
    );
  }

  // Editing form
  if (editing) {
    return (
      <div className="note-detail">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...note, ...form, updatedAt: Date.now() });
            setEditing(false);
          }}
        >
          <input
            className="note-detail-title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            autoFocus
          />
          <textarea
            className="note-detail-content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write your note here..."
            rows={10}
          />
          <div className="note-detail-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            <button type="button" className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </form>
      </div>
    );
  }

  // Read-only/detail mode
  return (
    <div className="note-detail">
      <h2 className="note-detail-title">{note.title || "Untitled"}</h2>
      <pre className="note-detail-content" style={{ whiteSpace: "pre-wrap" }}>
        {note.content}
      </pre>
      <div className="note-detail-meta">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </div>
      <div className="note-detail-actions">
        <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
        <button className="cancel-btn" onClick={onCancel}>Close</button>
      </div>
    </div>
  );
}

export default NoteDetail;
