import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useIsMobile } from "@hooks/useIsMobile";
import React, { createRef, useRef, useState } from "react";

const MdEditor: React.FC<{
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ content, setContent }) => {
  const isMobile = useIsMobile();
  const editorRef = createRef<Editor>();
  return (
    <Editor
      placeholder="Hello the Radish!"
      previewStyle={isMobile ? "tab" : "vertical"}
      ref={editorRef}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      onBlur={(event) => {
        const new_content = editorRef.current
          ? editorRef.current.getInstance().getMarkdown()
          : "";

        if (content == new_content) {
          // skip when the same
          console.info("same...");
          return;
        }

        setContent(new_content);
      }}
      hideModeSwitch
    />
  );
};

export default MdEditor;
