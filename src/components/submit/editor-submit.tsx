import ArticleType from "@/types/article";
import { Heading, Input, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";
import StyledMultiselect from "./styled-multiselect";

import styles from "./styles.module.css";

const EditorSubmit: React.FC<{ article: ArticleType | null }> = ({
  article,
}) => {
  const topics = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
  ];
  const authors = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
  ];

  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you&apos;re editing an article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Thanks!
      </Text>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
        className={styles["form-wrapper"]}>
        <p>Google Docs link:</p>
        <input
          name="link"
          placeholder="Google Docs Link"
          value={article?.title}
        />
        <p>Article title:</p>
        <input name="title" placeholder="Title" />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} />

        <p>Authors:</p>
        <StyledMultiselect values={authors} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default EditorSubmit;
