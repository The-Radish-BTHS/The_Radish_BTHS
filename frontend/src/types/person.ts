import { FlexProps } from "@chakra-ui/react";
import { MdOutlineBorderStyle } from "react-icons/md";
import ArticleType from "./article";

export default interface PersonType {
  name: string;
  title: string;
  isExec?: boolean;
  gradYear: number;
  description?: string;
  image?: string;

  id: string;
  articles: ArticleType[];
}

export type PersonPageType = Omit<PersonType, "image" | "id">;

export interface PersonCardType
  extends Omit<PersonType, "articles" | "gradYear"> {
  styles?: FlexProps;
}

export interface PersonReference {
  name: string;
  id: string;
}
