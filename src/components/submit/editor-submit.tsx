import { SubmitFormProps } from "@/pages/articles/submit";
import ArticleType from "@/types/article";
import { Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Button from "@components/shared/button";
import { Person, Topic } from "@prisma/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import StyledMultiselect from "./styled-multiselect";

const EditorSubmit: React.FC<SubmitFormProps> = ({
  contentData,
  titleData,
  errors,
  topicData,
  authorData,
}) => {
  return (
    <>
      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>
      <input placeholder="Title" required {...titleData} />

      <p>Topics covered:</p>
      <StyledMultiselect {...topicData} />

      <p>Authors:</p>
      <StyledMultiselect {...authorData} />

      <p>
        Content:<span style={{ color: "red" }}> *</span>
      </p>
      <input placeholder="Add the articul!" required {...contentData} />
    </>
  );
};

export default EditorSubmit;
