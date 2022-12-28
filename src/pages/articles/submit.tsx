import { Person, Topic } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "@components/pages/submit/styles.module.css";

import {
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { articleNameIsUnique } from "@lib/helpers.server";
import { trpc } from "@lib/trpc";
import { ErrorMessage } from "@hookform/error-message";

import Layout from "@components/layout/layout";
import Button from "@components/button";
import RequiredUserWrapper from "@components/required-user-wrapper";
import StyledMultiselect from "@components/pages/submit/styled-multiselect";
import InfoTooltip from "@components/info-tooltip";
import SubmitModal from "@components/pages/submit/submit-modal";
import { useIsMobile } from "@hooks/useIsMobile";
import InputWrapper from "@components/pages/submit/input-wrapper";

export interface InputData {
  title: string;
  content: string;
  graphics?: string;
  timeFrame?: string;
  otherTopics?: string;
}

const Submit: NextPage = () => {
  // Get Data
  const { data: sessionData } = useSession();
  const toast = useToast();
  const isMobile = useIsMobile();
  const submitDisclosure = useDisclosure();

  const articleSlugsQuery = trpc.article.getSlugs.useQuery();
  const topicsQuery = trpc.topic.getAll.useQuery();
  const peopleQuery = trpc.person.getAll.useQuery({ includeIsFormer: false });

  const articleSlugs = articleSlugsQuery.data || [];
  const topics = topicsQuery.data || [];
  const people = peopleQuery.data || [];

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

  // State
  const [topicSelections, setTopicSelections] = useState<Topic[]>([]);
  const [authorSelections, setAuthorSelections] = useState<Person[]>(
    sessionData?.user?.person ? [sessionData?.user?.person] : []
  );
  const [formData, setFormData] = useState<InputData>({
    title: "",
    content: "",
  });

  useEffect(() => {
    setAuthorSelections(
      sessionData?.user?.person ? [sessionData?.user?.person] : []
    );
  }, [sessionData]);

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputData>({
    criteriaMode: "all",
  });

  return (
    <Layout title="Submit an Article!" alignItems="center">
      <RequiredUserWrapper>
        <SubmitModal
          disclosure={submitDisclosure}
          data={formData}
          onClick={async (inputData: InputData) => {
            if (!sessionData?.user?.person.slug) return;
            await submitArticle
              .mutateAsync({
                title: inputData.title,
                link: inputData.content,
                graphics: inputData.graphics,
                timeFrame: inputData.timeFrame,
                otherTopics: inputData.otherTopics,
                authors: [
                  { slug: sessionData.user.person.slug },
                  ...authorSelections,
                ],
                topics: topicSelections,
              })
              .catch(() => 0);
          }}>
          <Text>Are you sure you have checked all the things???</Text>
          <ul style={{ marginTop: "1rem" }}>
            <li style={{ marginLeft: "1rem" }}>
              Is the doc shared with theradishbths@gmail.com?
            </li>
            <li style={{ marginLeft: "1rem" }}>Is your title correct?</li>
            <li style={{ marginLeft: "1rem" }}>
              Have you selected all of your topics?
            </li>
            <li style={{ marginLeft: "1rem" }}>
              Have you added anyone you worked with?
            </li>
            <li style={{ marginLeft: "1rem" }}>
              Have you requested any graphics you may need?
            </li>
            <li style={{ marginLeft: "1rem" }}>
              Have you set a time frame if your article is time sensitive?
            </li>
          </ul>
        </SubmitModal>

        <Heading textAlign="center">So you want to submit an Article?</Heading>
        <Text textAlign="center" fontSize="1.25rem">
          Do it! Submit it! Go!
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
          style={{ width: isMobile ? "85vw" : "60vw" }}>
          <InputWrapper
            title="Google Docs Link"
            description="Be sure to share this document with theradishbths@gmail.com!!! We can't edit it if you don't :("
            required>
            <input
              required
              placeholder="Google Docs Link"
              {...register("content", {
                required: true,
                pattern: {
                  value:
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                  message: "That doesn't seem like a valid link!!!",
                },
              })}
            />
            <p
              className={`${styles["form-element-margin"]} ${styles["error-message"]}`}>
              <ErrorMessage
                errors={errors}
                name="content"
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
          </InputWrapper>

          <InputWrapper title="Article Title" required>
            <input
              required
              placeholder="Title"
              {...register("title", {
                required: true,
                validate: (data) =>
                  articleNameIsUnique(data, articleSlugs ?? []),
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
          </InputWrapper>

          <InputWrapper title="Topics Covered">
            <StyledMultiselect
              options={topics}
              values={topicSelections}
              setValues={setTopicSelections}
            />
          </InputWrapper>

          <InputWrapper
            title="Authors"
            description="Did you work with anyone on this article? Add them here! Don't worry, you're here by default"></InputWrapper>
          <StyledMultiselect
            options={people?.filter(
              (person) => person.slug !== sessionData?.user?.person.slug
            )}
            values={authorSelections}
            setValues={setAuthorSelections}
          />

          <InputWrapper
            title="Graphics Requests"
            description="Did you have any graphics in mind for your article? If not, our amazing graphics team will take care of it for you (threatening). Leave blank if no graphics are required :)">
            <input
              placeholder="Graphics Requests"
              {...register("graphics")}
              className={styles["form-element-margin"]}
            />
          </InputWrapper>

          <InputWrapper
            title="Time Frame"
            description="Is your article super topical? Would you like it published within a certain amount of time? Let us know right here! Otherwise, leave it blank and press submit!!!">
            <input
              placeholder="Time frame"
              {...register("timeFrame")}
              className={styles["form-element-margin"]}
            />
          </InputWrapper>

          <InputWrapper
            title="Other Topics Requests"
            description="Do you feel like your article could be categorized as a topic that doesn't exist yet? Let us know what topics you think we should add and our handy editors will see to it!">
            <input placeholder="Other Topics" {...register("otherTopics")} />
          </InputWrapper>

          <Button type="submit" mt="1rem">
            Submit it!
          </Button>
        </form>
      </RequiredUserWrapper>
    </Layout>
  );
};

export default Submit;
