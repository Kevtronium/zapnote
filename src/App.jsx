import "./App.css";
import NoteContainer from "./components/NoteContainer/NoteContainer";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState(initialNotesData);

  return (
    <>
      <div className="app">
        <NoteContainer notes={notes} />
      </div>
    </>
  );
}

export default App;
