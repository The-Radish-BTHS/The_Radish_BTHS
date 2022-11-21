import ReactMarkdown from "react-markdown";

import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Image } from "@chakra-ui/react";

const Markdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm, html, remarkToc]}
    components={{
      ul: (props) => <ul style={{ width: "100%" }} {...props} />,
      li: (props) => <li style={{ marginLeft: "1rem" }} {...props} />,
      p: (props) => (
        <p style={{ marginBottom: "0.5rem", width: "100%" }} {...props} />
      ),
      h1: (props) => (
        <h1 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      h2: (props) => (
        <h2 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      h3: (props) => (
        <h3 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      h4: (props) => (
        <h4 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      h5: (props) => (
        <h5 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      h6: (props) => (
        <h6 style={{ width: "100%", marginTop: "1rem" }} {...props} />
      ),
      a: (props) => <a style={{ textDecoration: "underline" }} {...props} />,
      img: (props) => (
        <Image
          style={{ marginLeft: "auto", marginRight: "auto" }}
          alt="graphic"
          {...props}
        />
      ),
    }}>
    {content}
  </ReactMarkdown>
);

export default Markdown;
