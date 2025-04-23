import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}
export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  editorRef.current?.focus;
  return (
    <div className="px-5 pb-10 w-full">
      <Editor
        placeholder={placeholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};
