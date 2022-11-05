import { PortableText } from "@portabletext/react";
import { Code, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Link from "@components/shared/link";

export const PortableTextLayout: React.FC<{
  text: any[];
}> = ({ text }) => {
  if (!text) {
    return <></>;
  }
  return (
    <PortableText
      value={text}
      components={{
        list: ({ index, children }) => (
          <UnorderedList styleType={"disc" /*index ? "circle" : "disc"*/}>
            {children}
          </UnorderedList>
        ),
        listItem: ({ children }) => (
          <ListItem my="0.25rem" fontSize="1.1rem">
            {children}
          </ListItem>
        ),
        block: {
          h2: ({ children }) => (
            <Heading fontSize="1.5rem" mt="1.5rem">
              {children}
            </Heading>
          ),
        },
        marks: {
          code: ({ children }) => {
            return (
              <Code colorScheme="gray" fontSize="inherit">
                {children}
              </Code>
            );
          },
          link: ({ text, value }) => {
            return (
              <Link
                href={value.href}
                textDecoration="underline"
                fontSize="inherit">
                {text}
              </Link>
            );
          },
        },
        types: {
          code: ({ value }) => (
            <Code colorScheme="gray" my="0.75rem" fontSize="inherit" w="100%">
              {value.code.split("\n").map((line: string, index: number) => (
                <Text key={index}>{line}</Text>
              ))}
            </Code>
          ),
          break: () => <br />,
        },
      }}
    />
  );
};
