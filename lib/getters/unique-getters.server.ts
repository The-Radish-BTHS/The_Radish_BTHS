import prisma from "../prisma.server";
import SuperJSON from "superjson";
import { articleInclue, noDate, noSubDate } from "lib/helpers.server";

export const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    ...articleInclue,
  });

  return noDate(article);
};

export const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return noSubDate(topic);
};

export const getPerson = async (slug: string) => {
  const person = await prisma.person.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return noSubDate(person);
};

export const getIssue = async (slug: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      slug,
    },
    include: { articles: { where: { published: true }, ...articleInclue } },
  });

  return noDate(noSubDate(issue));
};
