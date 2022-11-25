import { t } from "..";
import { articleRouter } from "./article";
import { topicRouter } from "./topic";

export const appRouter = t.router({
  article: articleRouter,
  topic: topicRouter,
});
