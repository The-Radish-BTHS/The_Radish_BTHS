import ReactMarkdown from "react-markdown";
import { PluggableList } from "react-markdown/lib/react-markdown";

import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Image } from "@chakra-ui/react";

const formatStringToCamelCase = (str: string) => {
  const splitted = str.split("-");
  if (splitted.length === 1) return splitted[0];
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

export const getStyleObjectFromString = (str: string) => {
  const style: Record<string, string> = {};
  str.split(";").forEach((el) => {
    const [property, value] = el.split(":");
    if (!property) return;

    const formattedProperty = formatStringToCamelCase(property.trim());
    style[formattedProperty] = value.trim();
  });

  return style;
};

const Markdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    rehypePlugins={
      [
        rehypeRaw,
        rehypeSanitize({
          attributes: {
            "*": ["style"],
          },
        }),
      ] as PluggableList
    }
    remarkPlugins={[remarkGfm, html, remarkToc] as PluggableList}
    components={{
      ul: (props) => <ul style={{ width: "100%" }}>{props.children}</ul>,
      li: (props) => <li>{props.children}</li>,
      p: (props) => (
        <p
          style={{
            marginBottom: "0.5rem",
            width: "100%",
            ...(typeof props.style === "string"
              ? getStyleObjectFromString(props.style)
              : props.style),
          }}
        >
          {props.children}
        </p>
      ),
      h1: (props) => (
        <h1
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "2em",
          }}
        >
          {props.children}
        </h1>
      ),
      h2: (props) => (
        <h2
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1.5em",
          }}
        >
          {props.children}
        </h2>
      ),
      h3: (props) => (
        <h3
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1.17em",
          }}
        >
          {props.children}
        </h3>
      ),
      h4: (props) => (
        <h4
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "1em",
          }}
        >
          {props.children}
        </h4>
      ),
      h5: (props) => (
        <h5
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "0.83em",
          }}
        >
          {props.children}
        </h5>
      ),
      h6: (props) => (
        <h6
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "bolder",
            fontSize: "0.67em",
          }}
        >
          {props.children}
        </h6>
      ),
      a: (props) => <a style={{ textDecoration: "underline" }} {...props} />,
      img: (props) => (
        <Image
          style={{ marginLeft: "auto", marginRight: "auto" }}
          alt="graphic"
          {...props}
        />
      ),
      span: (props) => (
        <span
          style={{
            ...(typeof props.style === "string"
              ? getStyleObjectFromString(props.style)
              : props.style),
          }}
        >
          {props.children}
        </span>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default Markdown;
