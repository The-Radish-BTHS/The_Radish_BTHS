import ArticleType from "@/types/article";
import DefaultSubmit from "@components/pages/submit/default-submit";
import EditorSubmit from "@components/pages/submit/editor-submit";
import useSubmitModal from "@components/pages/submit/submit-modal";
import {
  getArticleSlugs,
  getPeople,
  getTopics,
  getTopicSlugs,
} from "@lib/getters/many-getters.server";
import prisma from "@lib/prisma.server";
import { Person, PersonPerms, Topic } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FieldErrorsImpl,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";

import styles from "@components/pages/submit/styles.module.css";

import { Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/button";
import { customSlugify } from "@lib/helpers.server";
import PersonType from "@/types/person";
import RequiredUserWrapper from "@components/required-user-wrapper";

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
    options: Topic[];
    select: React.Dispatch<React.SetStateAction<Topic[] | Person[]>>;
    selectedValues: Topic[];
    keepFirst?: boolean;
  };
  authorData: {
    options: Person[];
    select: React.Dispatch<React.SetStateAction<Topic[] | Person[]>>;
    selectedValues: Person[] | PersonType[];
    keepFirst?: boolean;
  };
  topicSlugs: string[];
  addTopic: (topic: Topic) => void;
}

const Submit: NextPage<{
  editing: boolean;
  article: ArticleType | null;
  topics: Topic[];
  people: Person[];
  articleSlugs: string[];
  topicSlugs: string[];
}> = ({ editing, article, topics, people, articleSlugs, topicSlugs }) => {
  // Get User Data
  const { data: sessionData } = useSession();

  const isEditing =
    sessionData &&
    sessionData?.user?.permission !== PersonPerms.NORMIE &&
    editing;

  // State
  const [topicSelections, setTopicSelections] = useState<Topic[] | Person[]>(
    []
  );
  const [authorSelections, setAuthorSelections] = useState<Topic[] | Person[]>(
    []
  );

  useEffect(() => console.log(topicSelections), [topicSelections]);

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<InputData>({
    criteriaMode: "all",
    defaultValues: isEditing
      ? {
          title: article?.title || "",
          content: article?.content || "",
        }
      : {},
  });

  useEffect(() => {
    if (
      sessionData &&
      sessionData?.user?.permission !== PersonPerms.NORMIE &&
      editing
    ) {
      setValue("title", article?.title || "");
      setValue("content", article?.content || "");
    }
  }, [sessionData, editing, article, setValue]);

  // Submit Functions
  const articleNameIsUnique = (title: string) => {
    const isUnique = articleSlugs.indexOf(customSlugify(title)) === -1;
    return isUnique || "An Article with that name already exists!";
  };

  const onDefaultSubmit: SubmitHandler<InputData> = async (inputData) => {
    const data = {
      ...inputData,
      slug: customSlugify(inputData.title),
      topics: topicSelections.map((topic) => topic.slug),
      authors: [sessionData?.user?.person, ...authorSelections].map(
        (author) => author?.slug
      ),
    };

    console.log(data);

    const response = await fetch(`/api/create?type=article`, {
      method: "post",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });

    return response;
  };

  const onEditorSubmit: SubmitHandler<InputData> = async (inputData) => {
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
  const contentData = register("content", {
    required: true,
    pattern: {
      value:
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      message: "That doesn't seem like a valid link!!!",
    },
  });
  const titleData = register("title", {
    required: true,
    validate: articleNameIsUnique,
  });
  const topicData = {
    options: topics,
    select: setTopicSelections,
    selectedValues: article?.topics || [],
  };
  const authorData = {
    options: people.filter(
      (person) => isEditing || person.slug !== sessionData?.user?.person.slug
    ),
    select: setAuthorSelections,
    selectedValues: isEditing
      ? article?.authors || []
      : sessionData?.user?.person
      ? [sessionData?.user?.person]
      : [],
    keepFirst: true,
  };

  const submitFormProps = {
    contentData,
    titleData,
    errors,
    topicData,
    authorData,
    topicSlugs,
    addTopic: (topic: Topic) =>
      setTopicSelections((topics) => [...topics, topic]),
  };

  return (
    <Layout title={`${isEditing ? "Edit" : "Submit"} an Article!`}>
      <RequiredUserWrapper>
        <ModalComponent
          onClick={isEditing ? onEditorSubmit : onDefaultSubmit}
        />

        <Heading textAlign="center">
          So you want to {isEditing ? "edit" : "submit"} an Article?
        </Heading>
        <Text textAlign="center" fontSize="1.25rem">
          {isEditing ? "Thanks!" : "Do it! Submit it! Go!"}
        </Text>
        <form
          autoComplete="off"
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
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
      </RequiredUserWrapper>
    </Layout>
  );
};

export default Submit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug?.toString();

  const article = slug
    ? await prisma.article.findUnique({
        where: {
          slug,
        },
        include: {
          authors: {
            select: {
              name: true,
              slug: true,
              position: true,
              description: true,
              gradYear: true,
              isExec: true,
              image: true,
            },
          },
          issue: { select: { title: true, slug: true } },
          topics: { select: { name: true, slug: true } },
        },
      })
    : null;

  const topics = await getTopics();
  const people = await getPeople(undefined, undefined, undefined, true);
  const articleSlugs = await getArticleSlugs();
  const topicSlugs = await getTopicSlugs();

  return {
    props: {
      editing: context.query.m === "1",
      article,
      topics,
      people,
      articleSlugs,
      topicSlugs,
    },
  };
};
