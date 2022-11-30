import { FlexProps } from "@chakra-ui/react";
import { Person } from "@prisma/client";
import ArticleType, { ArticardType } from "./article";

export default interface PersonType extends Person {
  former: boolean;
  slug: string;
  articles: ArticleType[];
}

export interface PersonPageType
  extends Omit<PersonType, "image" | "slug" | "articles"> {
  articles: ArticardType[];
  people: PersonCardType[];
}

export interface PersonCardType
  extends Omit<PersonType, "articles" | "gradYear"> {
  styles?: FlexProps;
}

export interface PersonReference {
  name: string;
  slug: string;
}
