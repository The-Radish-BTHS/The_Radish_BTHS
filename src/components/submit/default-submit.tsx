import StyledMultiselect from "./styled-multiselect";

import { ErrorMessage } from "@hookform/error-message";
import { SubmitFormProps } from "@/pages/articles/submit";

import styles from "@components/submit/styles.module.css";
import { Flex, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const DefaultSubmit: React.FC<SubmitFormProps> = ({
  contentData,
  titleData,
  errors,
  topicData,
  authorData,
}) => {
  return (
    <>
      <Flex w="60vw" justifyContent="space-between">
        <p>
          Google Docs link:<span style={{ color: "red" }}> *</span>
        </p>

        <Tooltip
          label="hello"
          placement="top"
          bg="#ebeae5"
          border="1px solid black"
          color="black"
          borderRadius="0.25rem">
          <InfoOutlineIcon />
        </Tooltip>
      </Flex>

      <input required placeholder="Google Docs Link" {...contentData} />
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

      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>

      <input required placeholder="Title" {...titleData} />

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
      <StyledMultiselect {...topicData} />

      <Flex w="60vw" justifyContent="space-between">
        <p>Partners:</p>

        <Tooltip
          label="hello"
          placement="top"
          bg="#ebeae5"
          border="1px solid black"
          color="black"
          borderRadius="0.25rem">
          <InfoOutlineIcon />
        </Tooltip>
      </Flex>
      <StyledMultiselect {...authorData} />
    </>
  );
};

export default DefaultSubmit;
