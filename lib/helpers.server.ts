import { Article, Person } from "@prisma/client";
import { type } from "os";

export const noDate = (obj: any) => ({
  ...obj,
  publishedOn: obj.publishedOn.getTime(),
});

export const noDateArray = (objs: any[]) => objs.map((obj) => noDate(obj));

export const noSubDate = (obj: any) => ({
  ...obj,
  articles: noDateArray(obj.articles),
});

interface personWithArticle extends Person {
  articles: (Article & {
    issue: {
      title: string;
      slug: string;
    } | null;
    authors: {
      slug: string;
      name: string;
    }[];
    topics: {
      slug: string;
      name: string;
    }[];
  })[];
}

export const moreBad = (people: personWithArticle[]) =>
  people.map((person) => ({
    ...person,
    articles: noDateArray(person.articles),
  }));

export const slugsToPaths = (arr: { slug: string }[]) =>
  arr.map((item) => ({ params: item }));

export const excludeSlugs = (arr?: string[]) => {
  if (arr) {
    return arr.map((slug) => ({
      slug,
    }));
  }
  return [];
};

export const articleInclue = {
  include: {
    authors: { select: { name: true, slug: true } },
    issue: { select: { title: true, slug: true } },
    topics: { select: { name: true, slug: true } },
  },
};
