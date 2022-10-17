import ArticleType from "./article";

export default interface TopicType {
  name: string;
  description: string;

  id: string;
  articles: ArticleType[];
}
