import useSubmitModal from "@components/pages/submit/submit-modal";
import { Person, UserPermission, Topic } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "@components/pages/submit/styles.module.css";

import { Heading, Text, useDisclosure, useToast } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/button";
import { articleNameIsUnique } from "@lib/helpers.server";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";
import { useRouter } from "next/router";
import StyledMultiselect from "./styled-multiselect";
import NewTopicModal from "./new-topic-modal";
import { InputData } from "@/pages/articles/submit";
import { ErrorMessage } from "@hookform/error-message";
import SubmitModal from "@components/pages/submit/submit-modal";
import { useIsMobile } from "@hooks/useIsMobile";

const SubmitEdited: NextPage = () => {
  // Get User Data
  const { data: sessionData } = useSession();
  const toast = useToast();
  const mobile = useIsMobile();
  const router = useRouter();
  const newTopicDisclosure = useDisclosure();
  const submitDisclosure = useDisclosure();

  const articleQuery = trpc.submission.get.useQuery({
    id: router.query.id?.toString() as string,
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
  const [topicSelections, setTopicSelections] = useState<Topic[]>(
    article?.topics || []
  );
  const [authorSelections, setAuthorSelections] = useState<Person[]>(
    article?.authors || []
  );
  const [formData, setFormData] = useState<InputData>({
    title: "",
    content: "",
  });

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
      content: article?.link || "",
    },
  });

  useEffect(() => {
    if (
      sessionData &&
      sessionData?.user?.permission !== UserPermission.NORMIE
    ) {
      setValue("title", article?.title || "");
      setValue("content", article?.link || "");
      setTopicSelections(article?.topics || []);
      setAuthorSelections(article?.authors || []);
    }
  }, [sessionData, article, setValue]);

  return (
    <Layout title="Edit an Article!" alignItems="center">
      <RequiredUserWrapper>
        <SubmitModal
          disclosure={submitDisclosure}
          data={formData}
          onClick={async (inputData: InputData) => {
            await submitArticle
              .mutateAsync({
                title: inputData.title,
                content: inputData.content,
                authors: authorSelections,
                topics: topicSelections,
              })
              .catch(() => 0);
          }}
        />

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
          style={{ width: mobile ? "85vw" : "60vw" }}>
          <NewTopicModal
            disclosure={newTopicDisclosure}
            topicSlugs={topicSlugs}
            addTopic={(topic: Topic) =>
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
              validate: (data) => articleNameIsUnique(data, articleSlugs ?? []),
            })}
          />
          <p
            className={`${styles["form-element-margin"]} ${styles["error-message"]}`}>
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
            className={styles.bottomMargin}>
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
          <input
            placeholder="Add the articul!"
            required
            {...register("content", {
              required: true,
            })}
          />
          <Button type="submit" mt="1rem">
            Submit it!
          </Button>
        </form>
      </RequiredUserWrapper>
    </Layout>
  );
};

export default SubmitEdited;
