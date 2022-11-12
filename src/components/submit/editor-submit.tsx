import { Heading, Input, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";
import { NextPage } from "next";

import styles from "./styles.module.css";

const EditorSubmit: NextPage = () => {
  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Edit it! Go!
      </Text>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
        className={styles["form-wrapper"]}>
        <p>Google Docs link:</p>
        <input name="link" placeholder="Google Docs Link" />
        <p>Article title:</p>
        <input name="title" placeholder="Title" />
        <p>Topics covered:</p>
        <input name="topics" placeholder="Topics" />
        <p>Partners:</p>
        <select name="partners" placeholder="Partners">
          <option value="" />
          <option value="Aramie">Aramie</option>
        </select>
        <Button type="submit">Submit it!</Button>
      </form>
    </Layout>
  );
};

export default EditorSubmit;
