import { articleInclude, excludeSlugs } from "@lib/helpers.server";
import { Person } from "@prisma/client";
import prisma from "../prisma.server";

export const getArticles = async (
  oldest?: boolean,
  issueSlug?: string,
  excluded?: string[],
  takeN?: number
) => {
  const issue = issueSlug ? { issueSlug } : {};
  const NOT = excludeSlugs(excluded);
  const take = takeN ? { take: takeN } : null;

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...issue,
      NOT,
    },
    include: articleInclude,
    orderBy: { publishedOn: oldest ? "asc" : "desc" },
    ...take,
  });

  return articles;
};

export const getTopics = async (excluded?: string[], takeN?: number) => {
  const NOT = excludeSlugs(excluded);
  const take = takeN ? { take: takeN } : null;

  const topics = await prisma.topic.findMany({
    where: { NOT },
    select: { slug: true, name: true },
    ...take,
  });

  return topics;
};

export const getPeople = async (
  execs?: boolean,
  excluded?: string[],
  takeN?: number,
  excludeFormer?: boolean
) => {
  const NOT = excludeSlugs(excluded);
  const take = takeN ? { take: takeN } : null;

  let where = execs !== undefined ? { isExec: execs } : {};
  const today = new Date();

  const people = await prisma.person.findMany({
    where: { ...where, NOT },
    orderBy: { gradYear: "desc" },
    ...take,
  });

  const former = (person: Person) =>
    excludeFormer
      ? {}
      : {
          former:
            today.getFullYear() > person.gradYear ||
            (today.getFullYear() === person.gradYear && today.getMonth() > 6),
        };

  return people.map((person) => ({
    ...person,
    ...former(person),
  }));
};

export const getPeopleWithArticles = async (
  execs?: boolean,
  excluded?: string[]
) => {
  const NOT = excludeSlugs(excluded);
  const today = new Date();

  let where = execs !== undefined ? { isExec: execs } : {};

  const people = await prisma.person.findMany({
    where: { ...where, NOT },
    include: { articles: { include: articleInclude } },
  });

  return people.map((person) => ({
    ...person,
    former: today.getMonth() > 6 && today.getFullYear() >= person.gradYear,
  }));
};

export const getIssues = async (
  oldest?: boolean,
  excluded?: string[],
  takeN?: number
) => {
  const NOT = excludeSlugs(excluded);
  const take = takeN ? { take: takeN } : null;

  const issues = await prisma.issue.findMany({
    where: { published: true, NOT },
    orderBy: { publishedOn: oldest ? "asc" : "desc" },
    ...take,
  });

  return issues;
};

export const getArticleSlugs = async () => {
  const articleSlugs = await prisma.article.findMany({
    orderBy: { publishedOn: "desc" },
    select: {
      slug: true,
    },
  });

  return articleSlugs.map(({ slug }) => slug);
};

export const getPeopleSlugs = async () => {
  const peopleSlugs = await prisma.person.findMany({
    select: {
      slug: true,
    },
  });

  return peopleSlugs.map(({ slug }) => slug);
};

export const getTopicSlugs = async () => {
  const topicSlugs = await prisma.topic.findMany({
    select: {
      slug: true,
    },
  });

  return topicSlugs.map(({ slug }) => slug);
};
