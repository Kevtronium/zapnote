import { useState } from "react";
import "./NoteCreator.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const initialNote = { title: "", content: [] };

export default function NoteCreator({ handleClose }) {
  const [note, setNote] = useState(initialNote);
  const [isActive, setActive] = useState(false);
  const editor = useCreateBlockNote();

  function handleClick(e) {
    e.stopPropagation();
    setActive(true);
  }

  function handleTitleChange(e) {
    e.stopPropagation();
    setNote((oldNote) => {
      return { ...oldNote, title: e.target.value };
    });
  }

  function handleEditorChange(newEditor) {
    // Stops NoteCreator from creating a note with no title and no content
    if (newEditor.document[0].content.length > 0) {
      setNote((oldNote) => {
        return { ...oldNote, content: [...newEditor.document] };
      });
    }
  }

  return (
    <div className="note-creator">
      {isActive && (
        <input
          type="text"
          value={note.title}
          name="title"
          id="note-title"
          placeholder="Title"
          onChange={handleTitleChange}
        />
      )}
      <BlockNoteView
        className="block-editor"
        editor={editor}
        onClick={handleClick}
        onChange={handleEditorChange}
      />
      <div className="buttons-container">
        {isActive && (
          <button
            className="close-button"
            onClick={() => {
              if (note.content.length > 0 || note.title !== "") {
                handleClose(note);
              }
              setActive(false);
              setNote({ title: "", content: [] });

              const allBlocks = editor.document.map((block) => block.id);
              editor.removeBlocks(allBlocks);
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
