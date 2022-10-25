import ArticleType, { ArticardType } from "./article";

export default interface TopicType {
  name: string;
  description: string;

  slug: string;
  articles: ArticleType[];
}

export interface TopicPageType extends Omit<TopicType, "slug" | "articles"> {
  articles: ArticardType[];
  topics: TopicReference[];
}

export type TopicCardType = Omit<TopicType, "articles" | "description">;

export type TopicReference = TopicCardType;
