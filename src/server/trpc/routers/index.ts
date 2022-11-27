import { t } from "..";
import { articleRouter } from "./article";
import { issueRouter } from "./issue";
import { peopleRouter } from "./people";
import { submissionRouter } from "./submission";
import { topicRouter } from "./topic";

export const appRouter = t.router({
  article: articleRouter,
  topic: topicRouter,
  person: peopleRouter,
  issue: issueRouter,
  submission: submissionRouter,
});
