import IssueType from "./issue";
import PersonType from "./person";
import TopicType from "./topic";

export default interface ArticleType {
  title: string;
  content: string;

  id: string;
  authors: PersonType[];
  issue: IssueType;
  tags: TopicType[];
}
