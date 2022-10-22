import { FlexProps } from "@chakra-ui/react";
import ArticleType from "./article";

export default interface IssueType {
  time: string;
  cover: string;
  description: string;
  pdf?: string;

  id: string;
  articles: ArticleType[];
}

export type IssuePage = Omit<IssueType, "cover" | "id">;

export interface IssueCard extends Omit<IssueType, "pdf" | "articles"> {
  styles?: FlexProps;
}
