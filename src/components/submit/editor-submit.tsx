import ArticleType from "@/types/article";
import { Heading, Input, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import StyledMultiselect from "./styled-multiselect";

import styles from "./styles.module.css";

type Inputs = {
  link: string;
  title: string;
};

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

  const [topicSelections, setTopicSelections] = useState<
    { name: string; id: number }[]
  >([]);
  const [authorSelections, setAuthorSelections] = useState<
    { name: string; id: number }[]
  >([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you&apos;re editing an article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Thanks!
      </Text>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-wrapper"]}>
        <p>Google Docs link:</p>
        <input
          placeholder="Google Docs Link"
          value={article?.title}
          {...register("link")}
        />
        <p>Article title:</p>
        <input placeholder="Title" {...register("title")} />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} select={setTopicSelections} />

        <p>Authors:</p>
        <StyledMultiselect values={authors} select={setAuthorSelections} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default EditorSubmit;
