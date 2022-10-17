import ArticleType from "./article";

export default interface PersonType {
  name: string;
  title: string;
  isExec?: boolean;
  gradYear: number;
  description: string;
  image?: string;

  id: string;
  articles: ArticleType[];
}
