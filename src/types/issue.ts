import { FlexProps } from "@chakra-ui/react";
import ArticleType, { ArticardType } from "./article";

export default interface IssueType {
  title: string;
  cover: string;
  description: string;
  pdf?: string;
  publishedOn: Date;
  published: string;

  slug: string;
  articles: ArticleType[];
}

export interface IssuePageType
  extends Omit<
    IssueType,
    "cover" | "slug" | "articles" | "published" | "publishedOn"
  > {
  articles: ArticardType[];
  latest: IssueCardType[];
}

export interface IssueCardType
  extends Omit<IssueType, "pdf" | "articles" | "published" | "publishedOn"> {
  styles?: FlexProps;
}

export interface IssueReference {
  title: string;
  slug: string;
}
