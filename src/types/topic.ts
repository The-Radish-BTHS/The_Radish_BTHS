import ArticleType, { ArticardType } from "./article";

export default interface TopicType {
  name: string;
  description: string;

  id: string;
  slug: string;
  articles: ArticleType[];
}

export interface TopicPage extends Omit<TopicType, "id" | "articles"> {
  articles: ArticardType[];
}

export type TopicCard = Omit<TopicType, "articles" | "description" | "id">;

export type TopicReference = TopicCard;
