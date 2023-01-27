import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { getTopicSlugs } from "./getters/many-getters.server";

export const prune = (text: string, n: number = 90) =>
  text[n] == " " || text.length < n
    ? text.slice(0, n)
    : text.slice(0, n).slice(0, text.slice(0, n).lastIndexOf(" "));

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

export const articleInclude = Prisma.validator<Prisma.ArticleInclude>()({
  authors: { select: { name: true, slug: true } },
  issue: { select: { title: true, slug: true } },
  topics: { select: { name: true, slug: true } },
});

export const deeperArticleInclude = Prisma.validator<Prisma.ArticleInclude>()({
  authors: true,
  issue: true,
  topics: true,
});

export const slugsToConnect = (slugs: string[]) => {
  return {
    connect: slugs?.map((slug) => ({ slug })),
  };
};

export const slugToConnect = (slug: string | null) => {
  return slug
    ? {
        connect: { slug },
      }
    : undefined;
};

export const customSlugify = (value: string) =>
  slugify(value, { lower: true, remove: /[^a-zA-Z]/g });

export const topicNameIsUnique = (name: string, slugs: string[]) => {
  const isUnique = slugs.indexOf(customSlugify(name)) === -1;
  return isUnique || "A Topic with that name already exists!";
};

export const articleNameIsUnique = (title: string, slugs: string[]) => {
  const isUnique = slugs.indexOf(customSlugify(title)) === -1;
  return isUnique || "An Article with that name already exists!";
};
