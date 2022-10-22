import { FlexProps } from "@chakra-ui/react";
import ArticleType, { ArticardType } from "./article";

export default interface IssueType {
  time: string;
  cover: string;
  description: string;
  pdf?: string;

  id: string;
  articles: ArticleType[];
}

export interface IssuePageType
  extends Omit<IssueType, "cover" | "id" | "articles"> {
  articles: ArticardType[];
}

export interface IssueCardType extends Omit<IssueType, "pdf" | "articles"> {
  styles?: FlexProps;
}

export interface IssueReference {
  time: string;
  id: string;
}
