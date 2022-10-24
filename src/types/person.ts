import { FlexProps } from "@chakra-ui/react";
import { MdOutlineBorderStyle } from "react-icons/md";
import ArticleType, { ArticardType } from "./article";

export default interface PersonType {
  name: string;
  title: string;
  isExec?: boolean;
  gradYear: number;
  description?: string;
  image?: string;

  id: string;
  slug: string;
  articles: ArticleType[];
}

export interface PersonPageType
  extends Omit<PersonType, "image" | "id" | "articles"> {
  articles: ArticardType[];
}

export interface PersonCardType
  extends Omit<PersonType, "articles" | "gradYear" | "id"> {
  styles?: FlexProps;
}

export interface PersonReference {
  name: string;
  slug: string;
}
