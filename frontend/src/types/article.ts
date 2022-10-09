import IssueType from "./issue";
import PersonType from "./person";
import TagType from "./tag";

export default interface ArticleType {
  title: string;
  content: string;

  id: string;
  authors: PersonType[];
  issue: IssueType;
  tags: TagType[];
}
