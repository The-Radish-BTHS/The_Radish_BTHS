import { Heading, Input, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";

import styles from "./styles.module.css";
import StyledMultiselect from "./styled-multiselect";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  link: string;
  title: string;
  topics: string;
  partners: string;
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

  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Submit it! Go!
      </Text>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
        className={styles["form-wrapper"]}>
        <p>Google Docs link:</p>
        <input name="link" placeholder="Google Docs Link" />
        <p>Article title:</p>
        <input name="title" placeholder="Title" />

        <p>Topics covered:</p>
        <StyledMultiselect values={topics} />

        <p>Partners:</p>
        <StyledMultiselect values={partners} />

        <Button type="submit" mt="1rem">
          Submit it!
        </Button>
      </form>
    </Layout>
  );
};

export default DefaultSubmit;
