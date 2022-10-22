import { FlexProps } from "@chakra-ui/react";
import IssueType from "./issue";
import PersonType from "./person";
import TopicType from "./topic";

export default interface ArticleType {
  title: string;
  content: string;

  id: string;
  authors: PersonType[];
  issue: IssueType;
  tags: TopicType[];
}

export interface ArticlePage {
  title: string;
  content: string;

  authors: PersonType[];
  issue: IssueType;
  tags: TopicType[];
  latest: ArticleType[];
}

export interface ArticleCard {
  title: string;
  content: string;

  id: string;
  authors: PersonType[];
  issue: IssueType;
  tags: TopicType[];
  outerStyles?: FlexProps;
}
