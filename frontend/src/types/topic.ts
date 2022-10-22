import ArticleType from "./article";

export default interface TopicType {
  name: string;
  description: string;

  id: string;
  articles: ArticleType[];
}

export type TopicPage = Omit<TopicType, "id">;

export type TopicCard = Omit<TopicType, "articles" | "description">;

export type TopicReference = TopicCard;
