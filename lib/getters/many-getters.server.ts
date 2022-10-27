import SuperJSON from "superjson";
import prisma from "../prisma.server";

export const getArticles = async (oldest?: boolean, issueSlug?: string) => {
  const issue = issueSlug ? { issueSlug } : {};

  const articles = await prisma.article.findMany({
    where: { published: true, ...issue },
    include: {
      issue: {
        select: { time: true, slug: true },
      },
      authors: {
        select: { name: true, slug: true },
      },
      topics: {
        select: { name: true, slug: true },
      },
    },
    orderBy: { publishedOn: oldest ? "asc" : "desc" },
  });

  return { ...(SuperJSON.serialize(articles).json as any) };
};

export const getTopics = async () => {
  const topics = await prisma.topic.findMany({
    select: { slug: true, name: true },
  });

  return topics;
};

export const getPeople = async (execs?: boolean) => {
  let query = {};
  if (execs !== undefined) {
    query = { where: { isExec: execs } };
  }

  const people = await prisma.person.findMany(query);

  return people;
};

export const getIssues = async (oldest?: boolean) => {
  const issues = await prisma.issue.findMany({
    where: { published: true },
    orderBy: { publishedOn: oldest ? "asc" : "desc" },
  });

  return { ...(SuperJSON.serialize(issues).json as any) };
};
