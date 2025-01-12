"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderEditorContent = ({ content }: { content: any }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc"
      }
    }
  });

  return (
    <div>
      {editor ? <EditorContent editor={editor} /> : <p>Loading content...</p>}
    </div>
  );
};

export default RenderEditorContent;
