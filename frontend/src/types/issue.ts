import ArticleType from "./article";

export default interface IssueType {
  time: string;
  cover: string;
  description: string;
  pdf?: string;

  id: string;
  articles: ArticleType[];
}
