import { FlexProps } from "@chakra-ui/react";
import { MdOutlineBorderStyle } from "react-icons/md";
import ArticleType, { ArticardType } from "./article";

export default interface PersonType {
  name: string;
  position: string;
  isExec?: boolean;
  gradYear: number;
  description?: string;
  image?: string;
  former: boolean;

  slug: string;
  articles: ArticleType[];
}

export interface PersonPageType
  extends Omit<PersonType, "image" | "slug" | "articles"> {
  articles: ArticardType[];
  people: PersonCardType[];
}

export interface PersonCardType extends Omit<PersonType, "articles"> {
  styles?: FlexProps;
}

export interface PersonReference {
  name: string;
  slug: string;
}
