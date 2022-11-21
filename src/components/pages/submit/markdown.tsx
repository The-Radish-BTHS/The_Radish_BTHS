import { BoldExtension, ItalicExtension } from "remirror/extensions";
import { Remirror, useRemirror } from "@remirror/react";

export const Markdown = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension(), new ItalicExtension()],
    content: "<p>I love <b>Remirror</b></p>",
    selection: "start",
    stringHandler: "html",
  });

  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} />
    </div>
  );
};
