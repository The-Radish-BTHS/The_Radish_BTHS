import prisma from "../prisma.server";
import SuperJSON from "superjson";

const articleInclue = {
  include: {
    authors: { select: { name: true, slug: true } },
    issue: { select: { time: true, slug: true } },
    topics: { select: { name: true, slug: true } },
  },
};

export const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    ...articleInclue,
  });

  return SuperJSON.serialize(article).json;
};

export const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return SuperJSON.serialize(topic).json;
};

export const getPerson = async (slug: string) => {
  const person = await prisma.person.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return SuperJSON.serialize(person).json;
};

export const getIssue = async (slug: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return SuperJSON.serialize(issue).json;
};
