import { FlexProps } from "@chakra-ui/react";
import IssueType, { IssueReference } from "./issue";
import PersonType, { PersonReference } from "./person";
import TopicType, { TopicReference } from "./topic";

export default interface ArticleType {
  title: string;
  content: string;

  id: string;
  authors: PersonType[];
  issue: IssueType;
  topics: TopicType[];
}

export interface ArticlePageType extends Omit<ArticleType, "id"> {
  latest: ArticardType[];
}

export interface ArticardType
  extends Omit<ArticleType, "authors" | "issue" | "topics"> {
  styles?: FlexProps;

  authors: PersonReference[];
  issue: IssueReference;
  topics: TopicReference[];
}
