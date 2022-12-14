import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MdEditor: React.FC = () => {
  return (
    <Editor
      placeholder="Hello the Radish!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      hideModeSwitch
    />
  );
};

export default MdEditor;
