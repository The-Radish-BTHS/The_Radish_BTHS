import ReactMarkdown from "react-markdown";
import { PluggableList } from "react-markdown/lib/react-markdown";

import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Image } from "@chakra-ui/react";

const Markdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    rehypePlugins={[rehypeRaw, rehypeSanitize] as PluggableList}
    remarkPlugins={[remarkGfm, html, remarkToc] as PluggableList}
    components={{
      ul: (props) => <ul style={{ width: "100%" }} {...props} />,
      li: (props) => <li style={{ marginLeft: "1rem" }} {...props} />,
      p: (props) => (
        <p style={{ marginBottom: "0.5rem", width: "100%" }} {...props} />
      ),
      h1: (props) => (
        <h1
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "2em",
          }}
          {...props}
        />
      ),
      h2: (props) => (
        <h2
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1.5em",
          }}
          {...props}
        />
      ),
      h3: (props) => (
        <h3
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1.17em",
          }}
          {...props}
        />
      ),
      h4: (props) => (
        <h4
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1em",
          }}
          {...props}
        />
      ),
      h5: (props) => (
        <h5
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "0.83em",
          }}
          {...props}
        />
      ),
      h6: (props) => (
        <h6
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "0.67em",
          }}
          {...props}
        />
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
