import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useIsMobile } from "@hooks/useIsMobile";

const MdEditor: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <Editor
      placeholder="Hello the Radish!"
      previewStyle={isMobile ? "tab" : "vertical"}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      hideModeSwitch
    />
  );
};

export default MdEditor;
