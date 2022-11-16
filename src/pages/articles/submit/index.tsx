import ArticleType from "@/types/article";
import DefaultSubmit from "@components/submit/default-submit";
import EditorSubmit from "@components/submit/editor-submit";
import useSubmitModal from "@components/submit/submit-modal";
import {
  getArticleSlugs,
  getPeople,
  getTopics,
} from "@lib/getters/many-getters.server";
import { getArticle } from "@lib/getters/unique-getters.server";
import { Person, PersonPerms, Topic } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FieldErrorsImpl,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import slugify from "slugify";

import styles from "@components/submit/styles.module.css";

import { Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";

type InputData = {
  title: string;
  content: string;
};

export interface SubmitFormProps {
  contentData: UseFormRegisterReturn<"content">;
  titleData: UseFormRegisterReturn<"title">;
  errors: Partial<
    FieldErrorsImpl<{
      title: string;
      content: string;
    }>
  >;
  topicData: {
    values: Topic[];
    select: React.Dispatch<React.SetStateAction<Topic[] | Person[]>>;
  };
  authorData: {
    values: Topic[];
    select: React.Dispatch<React.SetStateAction<Topic[] | Person[]>>;
  };
}

const Submit: NextPage<{
  editing: boolean;
  article: ArticleType | null;
  topics: Topic[];
  people: Person[];
  articleSlugs: string[];
}> = ({ editing, article, topics, people, articleSlugs }) => {
  // Get User Data
  const { data } = useSession();
  const isEditing = data?.user?.permission !== PersonPerms.NORMIE && editing;

  // State
  const [topicSelections, setTopicSelections] = useState<Topic[] | Person[]>(
    []
  );
  const [authorSelections, setAuthorSelections] = useState<Topic[] | Person[]>(
    []
  );

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputData>({
    criteriaMode: "all",
    defaultValues: {
      content: article?.content ?? "",
    },
  });

  // Submit Functions
  const articleNameIsUnique = (title: string) => {
    const isUnique =
      articleSlugs.indexOf(slugify(title, { lower: true, remove: /"/g })) ===
      -1;
    return isUnique || "An Article with that name already exists!";
  };

  const onDefaultSubmit: SubmitHandler<InputData> = (inputData) => {
    const data = {
      ...inputData,
      slug: slugify(inputData.title, { lower: true, remove: /"/g }),
      topics: topicSelections,
      authors: [...authorSelections],
    };
    console.log(data);
  };

  const onEditorSubmit: SubmitHandler<InputData> = (inputData) => {
    const data = {
      ...inputData,
      topics: topicSelections,
      authors: authorSelections,
    };
    console.log(data);
  };

  // Setup Modal
  const { ModalComponent, onOpen, setInputData } = useSubmitModal();

  // Props for forms
  const contentData = register("content");
  const titleData = register("title", {
    required: true,
    validate: articleNameIsUnique,
  });
  const topicData = {
    values: topics,
    select: setTopicSelections,
  };
  const authorData = {
    values: people,
    select: setAuthorSelections,
  };

  const submitFormProps = {
    contentData,
    titleData,
    errors,
    topicData,
    authorData,
  };

  return (
    <Layout title="Submit an Article!">
      <ModalComponent onClick={isEditing ? onEditorSubmit : onDefaultSubmit} />

      <Heading textAlign="center">
        So you want to {isEditing ? "edit" : "submit"} an Article?
      </Heading>
      <Text textAlign="center" fontSize="1.25rem">
        {isEditing ? "Thanks!" : "Do it! Submit it! Go!"}
      </Text>
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          onOpen();
          setInputData(data);
        })}
        className={styles["form-wrapper"]}>
        {isEditing ? (
          <EditorSubmit {...submitFormProps} />
        ) : (
          <DefaultSubmit {...submitFormProps} />
        )}
        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default Submit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug?.toString();
  const article = await (slug ? getArticle(slug) : null);

  const topics = await getTopics();
  const people = await getPeople();
  const articleSlugs = await getArticleSlugs();

  return {
    props: {
      editing: context.query.m === "1",
      article,
      topics,
      people,
      articleSlugs,
    },
  };
};
