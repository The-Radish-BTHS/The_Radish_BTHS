import prisma from "../prisma.server";
import { articleInclue } from "lib/helpers.server";

export const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    ...articleInclue,
  });

  return article;
};

export const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  return topic;
};

export const getPerson = async (slug: string) => {
  const person = await prisma.person.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclue },
  });

  const today = new Date();
  const former =
    person && today.getMonth() > 6 && today.getFullYear() >= person.gradYear;

  return { ...person, former };
};

export const getIssue = async (slug: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      slug,
    },
    include: { articles: { where: { published: true }, ...articleInclue } },
  });

  return issue;
};
