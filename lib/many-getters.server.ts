import { noDateArray } from "./helpers.server";
import prisma from "./prisma.server";

export const getArticles = async () => {
  const articles = await prisma.article.findMany({
    where: { published: true },
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
  });

  return noDateArray(articles);
};

export const getTopics = async () => {
  const topics = await prisma.topic.findMany({
    select: { slug: true, name: true },
  });

  return topics;
};

export const getPeople = async (execs: boolean) => {
  const people = await prisma.person.findMany({
    where: { isExec: execs },
  });

  return people;
};

export const getIssues = async () => {
  const issues = await prisma.issue.findMany({
    where: { published: true },
  });

  return noDateArray(issues);
};
