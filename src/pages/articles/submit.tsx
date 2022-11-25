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
import { Person, UserPermission, Topic } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FieldErrorsImpl,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";

import styles from "@components/pages/submit/styles.module.css";

import { Heading, Text, useToast } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/button";
import { customSlugify } from "@lib/helpers.server";
import PersonType from "@/types/person";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";

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
    select: React.Dispatch<React.SetStateAction<Topic[]>>;
    selectedValues: Topic[];
    keepFirst?: boolean;
  };
  authorData: {
    options: Person[];
    select: React.Dispatch<React.SetStateAction<Person[]>>;
    selectedValues: Person[];
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
  const toast = useToast();
  const submitArticle = trpc.article.submit.useMutation({
    onError(err) {
      toast({
        title: `Article Submit Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Article Submit Success!",
        status: "success",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });

  const isEditing =
    sessionData &&
    sessionData?.user?.permission !== UserPermission.NORMIE &&
    editing;

  // State
  const [topicSelections, setTopicSelections] = useState<Topic[]>([]);
  const [authorSelections, setAuthorSelections] = useState<Person[]>([]);

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
      sessionData?.user?.permission !== UserPermission.NORMIE &&
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
    if (!sessionData?.user?.person.slug) return;
    await submitArticle
      .mutateAsync({
        title: inputData.title,
        link: inputData.content,
        authors: [{ slug: sessionData.user.person.slug }, ...authorSelections],
        topics: topicSelections,
      })
      .catch(() => 0);
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
          className={styles["form-wrapper"]}
        >
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
