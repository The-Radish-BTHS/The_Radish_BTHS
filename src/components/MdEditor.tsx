import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useIsMobile } from "@hooks/useIsMobile";
import React, { createRef, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

const MdEditor: React.FC<{
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ content, setContent }) => {
  const isMobile = useIsMobile();
  const editorRef = createRef<Editor>();
  const toast = useToast();

  const toolbarItems = [
    "heading",
    "bold",
    "italic",
    "underscore",
    "strike",
    "divider",
    "hr",
    "quote",
    "divider",
    "ul",
    "ol",
    "task",
    "indent",
    "outdent",
    "divider",
    "table",
    "image",
    "link",
    "divider",
    // 'code',
    // 'codeblock'
  ];

  return (
    <Editor
      placeholder="Hello the Radish!"
      previewStyle={isMobile ? "tab" : "vertical"}
      ref={editorRef}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      hooks={{
        addImageBlobHook: () => {
          console.log("no");
          toast({
            title: `Uploading images is not currently supported. Please upload an image url instead!`,
            status: "error",
            duration: 4000,
            position: "bottom-right",
            isClosable: true,
          });
        },
      }}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["image", "link"],
        ["code", "codeblock"],
        ["scrollSync"],
      ]}
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
