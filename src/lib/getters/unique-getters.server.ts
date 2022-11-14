import prisma from "../prisma.server";
import { articleInclude } from "@lib/helpers.server";

export const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    ...articleInclude,
  });
  return { ...article };
};

export const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclude },
  });

  return topic;
};

export const getPerson = async (slug: string) => {
  const person = await prisma.person.findUnique({
    where: {
      slug,
    },
    include: { articles: articleInclude },
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
    include: { articles: { where: { published: true }, ...articleInclude } },
  });

  return issue;
};

export const getLastIssue = async () => {
  const issue = await prisma.issue.findFirst({
    where: { published: true },
    orderBy: { publishedOn: "desc" },
    take: 1,
  });

  return issue;
};
