import { useState } from "react";
import "./NoteCreator.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import checkboxImg from "../../assets/icons/checkbox-icon.svg";

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

  function handleChecklistClick() {
    setNote({ title: "", content: [{ type: "checkListItem", content: "" }] });

    editor.updateBlock(editor.document[0], { type: "checkListItem" });
    editor.setTextCursorPosition(editor.document[0].id);
    editor.focus();
    setActive(true);
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
      {!isActive && (
        <div className="list-buttons">
          <button className="checklist-toolkit" onClick={handleChecklistClick}>
            <img
              src={checkboxImg}
              alt="checkbox with a checkmark in the middle"
              width="16"
              height="16"
            />
            <span className="checklist-toolkit-text">Create checklist</span>
          </button>
        </div>
      )}
      <div className="buttons-container">
        {isActive && (
          <button
            className="close-button"
            onClick={() => {
              if (
                (note.content.length > 0 && note.content[0].content !== "") ||
                note.title !== ""
              ) {
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
