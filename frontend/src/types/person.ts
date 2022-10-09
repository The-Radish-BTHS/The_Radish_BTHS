import ArticleType from "./article";

export default interface PersonType {
  name: string;
  title: string;
  isExec: boolean;

  id: string;
  articles: ArticleType[];
}
