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

export const getPerson = async (slug: string, excludeFormer?: boolean) => {
  const person = await prisma.person.findUnique({
    where: {
      slug,
    },
    include: { articles: { include: articleInclude } },
  });

  const today = new Date();
  const former = excludeFormer
    ? {}
    : {
        former:
          person &&
          today.getMonth() > 6 &&
          today.getFullYear() >= person.gradYear,
      };

  return { ...person, ...former };
};

export const getIssue = async (slug: string) => {
  const issue = await prisma.issue.findUnique({
    where: {
      slug,
    },
    include: {
      articles: {
        where: { published: true },
        ...articleInclude,
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
