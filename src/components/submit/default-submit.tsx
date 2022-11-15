import { Heading, Input, Text, useDisclosure } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";

import styles from "./styles.module.css";
import StyledMultiselect from "./styled-multiselect";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useSubmitModal from "./submit-modal";
import { Person, Topic } from "@prisma/client";

type Inputs = {
  title: string;
  content: string;
};

const DefaultSubmit: React.FC<{
  name: string;
  topics: Topic[];
  people: Person[];
}> = ({ name, topics, people }) => {
  const [topicSelections, setTopicSelections] = useState<Topic[] | Person[]>(
    []
  );
  const [partnerSelections, setPartnerSelections] = useState<
    Topic[] | Person[]
  >([]);

  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    const data = {
      ...inputData,
      topics: topicSelections,
      authors: [...partnerSelections],
    };
    console.log(data);
  };

  const { ModalComponent, onOpen } = useSubmitModal();

  return (
    <Layout title="Submit an Article!">
      <ModalComponent onClick={handleSubmit(onSubmit)} />

      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Submit it! Go!
      </Text>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onOpen();
        }}
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
        <input required placeholder="Title" {...register("title")} />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} select={setTopicSelections} />

        <p>Partners:</p>
        <StyledMultiselect values={people} select={setPartnerSelections} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default DefaultSubmit;
