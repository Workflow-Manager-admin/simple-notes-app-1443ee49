import React, { useState, useEffect } from "react";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";

/**
 * Storage key for localStorage. (Replace with API backend as needed.)
 */
const STORAGE_KEY = "notes-app-notes";

// PUBLIC_INTERFACE
function App() {
  // Notes: {id, title, content, updatedAt}
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  // Fetch notes from localStorage (mock backend)
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setNotes(JSON.parse(data));
    }
  }, []);

  // Effect to persist notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Derived: filtered notes
  const filteredNotes = notes.filter(
    (n) =>
      (n.title && n.title.toLowerCase().includes(search.toLowerCase())) ||
      (n.content && n.content.toLowerCase().includes(search.toLowerCase()))
  );

  // UX: select newest note if none selected after creation/removal
  useEffect(() => {
    if (selectedId && !notes.some((n) => n.id === selectedId)) {
      setSelectedId(notes.length ? notes[0].id : null);
    }
  }, [notes, selectedId]);

  // CRUD handlers
  // PUBLIC_INTERFACE
  const handleAddNote = () => {
    const id = Date.now().toString();
    const newNote = {
      id,
      title: "",
      content: "",
      updatedAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleSelectNote = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleUpdateNote = (updated) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...updated } : n))
    );
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId(null);
  };

  // PUBLIC_INTERFACE
  const handleCancelDetail = () => {
    setSelectedId(null);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const selectedNote = notes.find((n) => n.id === selectedId);

  return (
    <div className="App">
      {/* Header */}
      <HeaderBar
        onAddNote={handleAddNote}
        search={search}
        setSearch={setSearch}
      />
      {/* Optional theme toggle button at top-right */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ position: "fixed", top: 22, right: 24, zIndex: 10 }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className="main-layout">
        <Sidebar
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={handleSelectNote}
        />
        <main className="main-content">
          {/* List + Detail views */}
          <NoteList
            notes={filteredNotes}
            onSelect={handleSelectNote}
            selectedId={selectedId}
          />
          <NoteDetail
            note={selectedNote}
            onSave={handleUpdateNote}
            onDelete={handleDeleteNote}
            onCancel={handleCancelDetail}
          />
        </main>
      </div>
      {/* Mobile-friendly footer? */}
    </div>
  );
}

export default App;
