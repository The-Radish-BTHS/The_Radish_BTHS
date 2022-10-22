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

export type PersonPage = Omit<PersonType, "image" | "id">;

export interface PersonCard extends Omit<PersonType, "articles" | "gradYear"> {
  outerStyles?: FlexProps;
}
