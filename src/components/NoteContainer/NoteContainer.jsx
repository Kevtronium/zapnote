import Note from "../Note/Note";
import "./NoteContainer.css";

export default function NoteContainer({ notes, handleDeleteNote }) {
  return (
    <div className="note-container">
      {notes.map((note) => {
        return (
          <Note
            title={note.title}
            content={note.content}
            id={note.id}
            key={note.id}
            handleDeleteNote={handleDeleteNote}
          />
        );
      })}
    </div>
  );
}
