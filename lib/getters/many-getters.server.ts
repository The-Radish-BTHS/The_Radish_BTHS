import { excludeSlugs, noDateArray } from "lib/helpers.server";
import SuperJSON from "superjson";
import prisma from "../prisma.server";

export const getArticles = async (
  oldest?: boolean,
  issueSlug?: string,
  excluded?: string[]
) => {
  const issue = issueSlug ? { issueSlug } : {};
  const NOT = excludeSlugs(excluded);

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...issue,
      NOT,
    },
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

  return noDateArray(articles);
};

export const getTopics = async (excluded?: string[]) => {
  const NOT = excludeSlugs(excluded);

  const topics = await prisma.topic.findMany({
    where: { NOT },
    select: { slug: true, name: true },
  });

  return topics;
};

export const getPeople = async (execs?: boolean, excluded?: string[]) => {
  const NOT = excludeSlugs(excluded);

  let where = execs !== undefined ? { isExec: execs } : {};

  const people = await prisma.person.findMany({
    where: { ...where, NOT },
  });

  return people;
};

export const getIssues = async (oldest?: boolean, excluded?: string[]) => {
  const NOT = excludeSlugs(excluded);

  const issues = await prisma.issue.findMany({
    where: { published: true, NOT },
    orderBy: { publishedOn: oldest ? "asc" : "desc" },
  });

  return noDateArray(issues);
};
