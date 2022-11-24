import StyledMultiselect from "./styled-multiselect";

import { ErrorMessage } from "@hookform/error-message";
import { SubmitFormProps } from "@/pages/articles/submit";

import styles from "./styles.module.css";
import { Flex, useDisclosure } from "@chakra-ui/react";
import InfoTooltip from "@components/info-tooltip";
import NewTopicModal from "./new-topic-modal";

const DefaultSubmit: React.FC<SubmitFormProps> = ({
  contentData,
  titleData,
  errors,
  topicData,
  authorData,
  topicSlugs,
}) => {
  const disclosure = useDisclosure();

  return (
    <>
      <NewTopicModal disclosure={disclosure} topicSlugs={topicSlugs} />
      <Flex w="60vw" justifyContent="space-between">
        <p>
          Google Docs link:<span style={{ color: "red" }}> *</span>
        </p>

        <InfoTooltip text="Be sure to share this document with theradishbths@gmail.com!!! We can't edit it if you don't :(" />
      </Flex>

      <input required placeholder="Google Docs Link" {...contentData} />
      <p
        className={`${styles["form-element-margin"]} ${styles["error-message"]}`}
      >
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

      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>

      <input required placeholder="Title" {...titleData} />

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
      <StyledMultiselect {...topicData} />
      <button onClick={disclosure.onOpen} type="button">
        + Add new topic
      </button>

      <Flex w="60vw" justifyContent="space-between">
        <p>Authors:</p>

        <InfoTooltip text="Did you work with anyone on this article? Add them here! Don't worry, you're here by default" />
      </Flex>
      <StyledMultiselect {...authorData} />
    </>
  );
};

export default DefaultSubmit;
