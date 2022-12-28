import { Flex, Heading, Text, useDisclosure, useToast } from "@chakra-ui/react";
import Link from "next/link";

import { Person, Topic } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "@components/pages/submit/styles.module.css";

import Layout from "@components/layout/layout";
import Button from "@components/button";
import { articleNameIsUnique } from "@lib/helpers.server";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";
import { useRouter } from "next/router";
import StyledMultiselect from "@components/pages/submit/styled-multiselect";
import NewTopicModal from "@components/pages/submit/new-topic-modal";
import { ErrorMessage } from "@hookform/error-message";
import SubmitModal from "@components/pages/submit/submit-modal";
import { useIsMobile } from "@hooks/useIsMobile";
import { useCanAccess } from "@hooks/useCanAccess";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("@components/MdEditor"), {
  ssr: false,
});

export type InputData = {
  title: string;
};

const Edit: NextPage = () => {
  // Get User Data
  const { data: sessionData } = useSession();
  const toast = useToast();
  const mobile = useIsMobile();
  const router = useRouter();
  const submissionId = router.query.id?.toString() as string;
  const { canAccess } = useCanAccess();
  const canEdit = canAccess("editor");
  const newTopicDisclosure = useDisclosure();
  const submitDisclosure = useDisclosure();

  const articleQuery = trpc.submission.get.useQuery({
    id: submissionId,
  });
  const articleSlugsQuery = trpc.article.getSlugs.useQuery();
  const topicsQuery = trpc.topic.getAll.useQuery();
  const topicSlugsQuery = trpc.topic.getSlugs.useQuery();
  const peopleQuery = trpc.person.getAll.useQuery({ includeIsFormer: false });

  const articleSlugs = articleSlugsQuery.data || [];
  const topics = topicsQuery.data || [];
  const topicSlugs = topicSlugsQuery.data || [];
  const people = peopleQuery.data || [];
  const article = articleQuery.data;

  const submitArticle = trpc.article.editorSubmit.useMutation({
    onError(err) {
      toast({
        title: `Article Edit Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Article Edited Successfully!",
        status: "success",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });

  // State
  const [topicSelections, setTopicSelections] = useState<Omit<Topic, "id">[]>(
    article?.topics || []
  );
  const [authorSelections, setAuthorSelections] = useState<Person[]>(
    article?.authors || []
  );
  const [formData, setFormData] = useState<InputData>({
    title: "",
  });
  const [content, setContent] = useState("");

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<InputData>({
    criteriaMode: "all",
    defaultValues: {
      title: article?.title || "",
    },
  });

  useEffect(() => {
    if (canEdit) {
      setValue("title", article?.title || "");
      setTopicSelections(article?.topics || []);
      setAuthorSelections(article?.authors || []);
    }
  }, [sessionData, article, setValue, canEdit]); // Can access is changing

  return (
    <Layout title="Edit an Article!" alignItems="center">
      {canAccess("editor") ? (
        <RequiredUserWrapper>
          <SubmitModal
            disclosure={submitDisclosure}
            data={{ ...formData, content }}
            onClick={async (inputData: InputData) => {
              console.log(topicSelections);
              await submitArticle
                .mutateAsync({
                  title: inputData.title,
                  content: content,
                  authors: authorSelections,
                  topics: topicSelections,
                  id: submissionId,
                })
                .catch(() => 0);
            }}
          >
            <Text>Are you sure you have edited all the things???</Text>
            <ul style={{ marginTop: "1rem" }}>
              <li style={{ marginLeft: "1rem" }}>Is the title all good?</li>
              <li style={{ marginLeft: "1rem" }}>Are the topics perfect?</li>
            </ul>
          </SubmitModal>

          <Heading textAlign="center">So you want to edit an Article?</Heading>
          <Text textAlign="center" fontSize="1.25rem">
            Thanks!
          </Text>
          <form
            autoComplete="off"
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onSubmit={handleSubmit((data) => {
              submitDisclosure.onOpen();
              setFormData(data);
            })}
            className={styles["form-wrapper"]}
            style={{ width: mobile ? "85vw" : "60vw" }}
          >
            <NewTopicModal
              disclosure={newTopicDisclosure}
              topicSlugs={topicSlugs}
              addTopic={(topic) =>
                setTopicSelections((topics) => [...topics, topic])
              }
            />
            <p>
              Article title:<span style={{ color: "red" }}> *</span>
            </p>
            <input
              placeholder="Title"
              required
              {...register("title", {
                required: true,
                validate: (data) =>
                  articleNameIsUnique(data, articleSlugs ?? []),
              })}
            />
            <p
              className={`${styles["form-element-margin"]} ${styles["error-message"]}`}
            >
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message], i) => (
                        <span key={i}>
                          {message}
                          <br />
                        </span>
                      ))
                    : null;
                }}
              />
            </p>

            <p>Topics covered:</p>
            <StyledMultiselect
              options={topics}
              values={topicSelections}
              setValues={setTopicSelections}
              marginBottom={false}
            />

            <button
              onClick={newTopicDisclosure.onOpen}
              type="button"
              className={styles.bottomMargin}
            >
              + Add new topic
            </button>

            <p>Authors:</p>
            <StyledMultiselect
              options={people}
              values={authorSelections}
              setValues={setAuthorSelections}
            />

            <p>
              Content:<span style={{ color: "red" }}> *</span>
            </p>
            <DynamicEditor content={content} setContent={setContent} />
            {/* <input
              placeholder="Add the articul!"
              required
              {...register("content", {
                required: true,
              })}
            /> */}
            <Button type="submit" mt="1rem">
              Submit it!
            </Button>
          </form>
        </RequiredUserWrapper>
      ) : (
        <Flex
          h="100%"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Heading>You can&apos;t edit!</Heading>
          <Link href="/about">Apply to join the editing team!</Link>
        </Flex>
      )}
    </Layout>
  );
};

export default Edit;
