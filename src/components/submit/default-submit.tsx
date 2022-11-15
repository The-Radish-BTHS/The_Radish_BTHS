import { Heading, Input, Text, useDisclosure } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";

import styles from "./styles.module.css";
import StyledMultiselect from "./styled-multiselect";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useSubmitModal from "./submit-modal";
import { Person, Topic } from "@prisma/client";
import slugify from "slugify";

import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  title: string;
  content: string;
};

const DefaultSubmit: React.FC<{
  name: string;
  topics: Topic[];
  people: Person[];
  articleSlugs: string[];
}> = ({ name, topics, articleSlugs }) => {
  const [topicSelections, setTopicSelections] = useState<Topic[] | Person[]>(
    []
  );
  const [partnerSelections, setPartnerSelections] = useState<
    Topic[] | Person[]
  >([]);

  const articleSlugIsUnique = (title: string) => {
    return (
      articleSlugs.indexOf(slugify(title, { lower: true, remove: /"/g })) === -1
    );
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    const data = {
      ...inputData,
      slug: slugify(inputData.title, { lower: true, remove: /"/g }),
      topics: topicSelections,
      authors: [...partnerSelections],
    };
    console.log(data);
    console.log(articleSlugs.indexOf(data.slug) !== -1);
  };

  const { ModalComponent, onOpen, setInputData } = useSubmitModal();

  return (
    <Layout title="Submit an Article!">
      <ModalComponent onClick={onSubmit} />

      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Submit it! Go!
      </Text>
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          onOpen();
          setInputData(data);
        })}
        className={styles["form-wrapper"]}>
        <p>
          Google Docs link:<span style={{ color: "red" }}> *</span>
        </p>
        <input
          required
          placeholder="Google Docs Link"
          {...register("content")}
        />
        <p>
          Article title:<span style={{ color: "red" }}> *</span>
        </p>
        <input
          required
          placeholder="Title"
          {...register("title", {
            required: true,
            validate: articleSlugIsUnique,
          })}
          aria-invalid="true"
        />

        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} select={setTopicSelections} />

        <p>Partners:</p>
        <StyledMultiselect values={[]} select={setPartnerSelections} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default DefaultSubmit;
