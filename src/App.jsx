import "./App.css";
import NoteContainer from "./components/NoteContainer/NoteContainer";
import NoteCreator from "./components/NoteCreator/NoteCreator";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  function handleClose(note) {
    const newNote = { ...note, id: self.crypto.randomUUID() };

    if (newNote.content.length === 0) {
      newNote.content = [{ type: "paragraph", content: "" }];
    }
    setNotes((oldNotes) => {
      return [...oldNotes, newNote];
    });
  }

  function handleDeleteNote(noteID) {
    setNotes((oldNotes) => {
      const newNotes = oldNotes.filter((note) => {
        return note.id !== noteID;
      });
      return newNotes;
    });
  }

  return (
    <>
      <div className="app">
        <NoteCreator handleClose={handleClose} />
        <NoteContainer notes={notes} handleDeleteNote={handleDeleteNote} />
      </div>
    </>
  );
}

export default App;
