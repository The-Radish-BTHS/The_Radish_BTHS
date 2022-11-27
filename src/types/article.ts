import { FlexProps } from "@chakra-ui/react";
import IssueType, { IssueReference } from "./issue";
import PersonType, { PersonReference } from "./person";
import TopicType, { TopicReference } from "./topic";

export default interface ArticleType {
  title: string;
  content: string;
  publishedOn: Date;
  published: string;

  slug: string;
  authors: PersonType[];
  issue?: IssueType;
  topics: TopicType[];
}

export interface ArticlePageType
  extends Omit<ArticleType, "slug" | "published"> {
  latest: ArticardType[];
}

export interface ArticardType
  extends Omit<
    ArticleType,
    "authors" | "issue" | "topics" | "published" | "publishedOn" | "content"
  > {
  excerpt: string | null;
  styles?: FlexProps;

  authors: PersonReference[];
  issue?: IssueReference | null;
  topics: TopicReference[];
}
