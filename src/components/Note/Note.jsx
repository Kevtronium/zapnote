import "./Note.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

export default function Note({ title, content, id, handleDeleteNote }) {
  let editorSettings = { initialContent: content };
  const editor = useCreateBlockNote(editorSettings);

  return (
    <div className="note">
      {title ? <h2>{title}</h2> : null}
      <BlockNoteView editor={editor} editable={false} />
      <div className="note-buttons-container">
        <button
          onClick={() => {
            handleDeleteNote(id);
          }}
          className="note-delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
