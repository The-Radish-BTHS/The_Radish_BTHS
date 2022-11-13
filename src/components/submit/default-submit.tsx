import { Heading, Input, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";

import styles from "./styles.module.css";
import StyledMultiselect from "./styled-multiselect";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  link: string;
  title: string;
};

const DefaultSubmit: React.FC = () => {
  const topics = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
  ];
  const partners = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
  ];

  const [topicSelections, setTopicSelections] = useState<
    { name: string; id: number }[]
  >([]);
  const [partnerSelections, setPartnerSelections] = useState<
    { name: string; id: number }[]
  >([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    const data = {
      ...inputData,
      topicNames: topicSelections.map((topic) => topic.name),
      authorNames: [...partnerSelections.map((partner) => partner.name)],
    };
    console.log(data);
  };

  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Submit it! Go!
      </Text>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-wrapper"]}>
        <p>
          Google Docs link:<span style={{ color: "red" }}> *</span>
        </p>
        <input required placeholder="Google Docs Link" {...register("link")} />
        <p>
          Article title:<span style={{ color: "red" }}> *</span>
        </p>
        <input required placeholder="Title" {...register("title")} />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} select={setTopicSelections} />

        <p>Partners:</p>
        <StyledMultiselect values={partners} select={setPartnerSelections} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default DefaultSubmit;
