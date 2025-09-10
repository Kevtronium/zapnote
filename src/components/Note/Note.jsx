import "./Note.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

export default function Note({ title, content, id }) {
  let editorSettings = { initialContent: content };
  const editor = useCreateBlockNote(editorSettings);

  return (
    <div className="note">
      {title ? <h2>{title}</h2> : null}
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
}
