import prisma from "../prisma.server";
import { articleInclude } from "@lib/helpers.server";

export const getArticle = async (slug: string) => {
  return prisma.article.findUnique({
    where: {
      slug,
    },
    include: articleInclude,
  });
};

export const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
    include: { articles: { include: articleInclude } },
  });

  return topic;
};

export const getIssue = async (slug: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      slug,
    },
    include: {
      articles: {
        where: { published: true },
        include: articleInclude,
      },
    },
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
