import { articleInclue, excludeSlugs } from "lib/helpers.server";
import SuperJSON from "superjson";
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
    include: {
      issue: {
        select: { title: true, slug: true },
      },
      authors: {
        select: { name: true, slug: true },
      },
      topics: {
        select: { name: true, slug: true },
      },
    },
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
  takeN?: number
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

  return people.map((person) => ({
    ...person,
    former: today.getMonth() > 6 && today.getFullYear() >= person.gradYear,
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
    include: { articles: articleInclue },
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
