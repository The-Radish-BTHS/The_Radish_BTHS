import prisma from "@lib/prisma.server";

export const revalidateTopics = async () => {
  const pathsToRevalidate: string[] = ["/"];
  const topics = await prisma.topic.findMany({
    select: { slug: true },
  });
  topics.forEach(async ({ slug }) => {
    pathsToRevalidate.push(`/topics/${slug}`);
  });

  return pathsToRevalidate;
};

export const revalidateIssues = async () => {
  const pathsToRevalidate: string[] = ["/"];
  pathsToRevalidate.push("/issues");

  const issues = await prisma.issue.findMany({
    select: { slug: true },
  });
  issues.forEach(async ({ slug }) => {
    pathsToRevalidate.push(`/issues/${slug}`);
  });

  return pathsToRevalidate;
};

export const revalidatePeople = async (isExec: boolean) => {
  const pathsToRevalidate: string[] = ["/"];

  pathsToRevalidate.push(isExec ? "/execs" : "/people");

  const people = await prisma.person.findMany({
    select: { slug: true },
  });
  people.forEach(async ({ slug }) => {
    pathsToRevalidate.push(`/people/${slug}`);
  });

  return pathsToRevalidate;
};

export const revalidateArticles = async (
  issue: string,
  topics: string[],
  authors: string[]
) => {
  const pathsToRevalidate: string[] = ["/"];

  // Revalidate /articles and slug paths
  pathsToRevalidate.push("/articles");
  const articles = await prisma.article.findMany({
    select: { slug: true },
  });
  articles.forEach(async ({ slug }) => {
    pathsToRevalidate.push(`/articles/${slug}`);
  });

  // Revalidate realation fields
  if (issue) {
    pathsToRevalidate.push(`issues/${issue}`);
  }
  topics?.forEach((slug: string) => pathsToRevalidate.push(`topics/${slug}`));
  authors?.forEach((slug: string) => pathsToRevalidate.push(`people/${slug}`));

  return pathsToRevalidate;
};
