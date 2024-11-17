import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./MenuBar";

import { cn } from "@/lib/utils";

type TextEditorProps = {
  onChange: (content: JSONContent) => void;
  initialContent?: JSONContent; // Add this line
};

export default function RichTextEditor({
  onChange,
  initialContent
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
          "min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 "
        )
      }
    },
    immediatelyRender: false
  });
  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
